import "server-only";
import { Resend } from "resend";
import { formatPrice } from "@/data/catalog";
import { escapeHtml, type resolveOrder } from "@/lib/order";

type ResolvedOrder = NonNullable<ReturnType<typeof resolveOrder>>;

function resendOptions() {
  const configuredBaseUrl = process.env.RESEND_BASE_URL;
  if (!configuredBaseUrl) return undefined;
  const baseUrl = new URL(configuredBaseUrl);
  const isLoopback = baseUrl.hostname === "127.0.0.1" || baseUrl.hostname === "localhost";
  if (process.env.RESEND_ALLOW_LOCAL_PROVIDER_MOCK !== "true" || !isLoopback) {
    throw new Error("Custom email provider URL is not allowed.");
  }
  return { baseUrl: baseUrl.origin };
}

export async function sendOrderEmails(order: ResolvedOrder) {
  const { input, course, branch, offering } = order;
  const fullName = `${input.firstName} ${input.lastName}`;
  const price = formatPrice(offering.priceCzk);
  const safe = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(input.email),
    phone: escapeHtml(input.phone),
    note: escapeHtml(input.note || "—"),
    course: escapeHtml(course.title),
    branch: escapeHtml(branch.name),
    price: escapeHtml(price),
  };

  if (process.env.NODE_ENV !== "production" && process.env.ORDER_EMAIL_MODE !== "resend") {
    return { accepted: true as const, providerIds: ["local-student", "local-branch"] };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) throw new Error("Email provider is not configured.");

  const resend = new Resend(apiKey, resendOptions());
  const replyTo = process.env.RESEND_REPLY_TO || branch.email;
  const messages = [
    {
      from,
      to: [input.email],
      replyTo,
      subject: `Potvrzení přihlášky – ${course.title}`,
      text: `Dobrý den ${fullName},\n\npřijali jsme vaši přihlášku na ${course.title}, pobočka ${branch.name}, cena ${price}. Pobočka se vám ozve s dalšími kroky.\n\nAutoškola BuBu`,
      html: `<p>Dobrý den ${safe.fullName},</p><p>přijali jsme vaši přihlášku na <strong>${safe.course}</strong>.</p><ul><li>Pobočka: ${safe.branch}</li><li>Cena: ${safe.price}</li></ul><p>Pobočka se vám ozve s dalšími kroky.</p><p>Autoškola BuBu</p>`,
    },
    {
      from,
      to: [branch.email],
      replyTo: input.email,
      subject: `Nová přihláška – ${course.title}`,
      text: `Jméno: ${fullName}\nE-mail: ${input.email}\nTelefon: ${input.phone}\nKurz: ${course.title}\nPobočka: ${branch.name}\nCena: ${price}\nPoznámka: ${input.note || "—"}`,
      html: `<h1>Nová přihláška</h1><ul><li>Jméno: ${safe.fullName}</li><li>E-mail: ${safe.email}</li><li>Telefon: ${safe.phone}</li><li>Kurz: ${safe.course}</li><li>Pobočka: ${safe.branch}</li><li>Cena: ${safe.price}</li><li>Poznámka: ${safe.note}</li></ul>`,
    },
  ];
  const result = await resend.batch.send(messages, {
    idempotencyKey: `order/${input.idempotencyKey}`,
  });
  const providerIds = result.data?.data.map((item) => item.id) ?? [];
  if (result.error || providerIds.length !== 2 || providerIds.some((id) => !id)) {
    throw new Error("Email provider did not accept both messages.");
  }
  return { accepted: true as const, providerIds };
}
