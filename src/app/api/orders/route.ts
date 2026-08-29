import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/email";
import { MAX_ORDER_BYTES, orderSchema, resolveOrder, validateOrderTiming } from "@/lib/order";
import { consumeOrderAttempt, isSameOrigin, rateLimitKey } from "@/lib/request-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function response(message: string, status: number, fieldErrors?: Record<string, string[]>) {
  return NextResponse.json({ ok: false, message, fieldErrors }, { status });
}

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const forwardedHost =
    request.headers.get("x-forwarded-host") || request.headers.get("host") || requestUrl.host;
  const forwardedProtocol =
    request.headers.get("x-forwarded-proto") || requestUrl.protocol.replace(":", "");
  const browserFacingUrl = `${forwardedProtocol}://${forwardedHost}${requestUrl.pathname}`;
  if (!isSameOrigin(request.headers.get("origin"), browserFacingUrl))
    return response("Požadavek nebyl přijat.", 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return response("Očekáváme JSON.", 415);

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (declaredLength > MAX_ORDER_BYTES) return response("Požadavek je příliš velký.", 413);

  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (!consumeOrderAttempt(rateLimitKey(address)))
    return response("Zkuste to prosím později.", 429);

  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_ORDER_BYTES)
      return response("Požadavek je příliš velký.", 413);
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(body);
    } catch {
      return response("Požadavek nemá platný JSON formát.", 400);
    }
    const parsed = orderSchema.safeParse(parsedJson);
    if (!parsed.success)
      return response("Zkontrolujte zvýrazněná pole.", 400, parsed.error.flatten().fieldErrors);
    if (!validateOrderTiming(parsed.data.formStartedAt))
      return response("Formulář byl odeslán příliš rychle.", 400);
    const order = resolveOrder(parsed.data);
    if (!order) return response("Tento kurz není na vybrané pobočce dostupný.", 400);
    await sendOrderEmails(order);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return response("Přihlášku se nepodařilo odeslat. Zkuste to prosím znovu.", 503);
  }
}
