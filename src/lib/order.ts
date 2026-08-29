import { z } from "zod";
import { getOffering } from "@/data/catalog";

export const MAX_ORDER_BYTES = 20_000;
export const MIN_FORM_FILL_MS = 3_500;

export const orderSchema = z.object({
  firstName: z.string().trim().min(2, "Zadejte jméno.").max(80, "Jméno je příliš dlouhé."),
  lastName: z.string().trim().min(2, "Zadejte příjmení.").max(80, "Příjmení je příliš dlouhé."),
  email: z.email("Zadejte platný e-mail.").max(254),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{7,19}$/, "Zadejte platný telefon."),
  courseId: z.string().min(1, "Vyberte kurz."),
  branchId: z.string().min(1, "Vyberte pobočku."),
  note: z.string().trim().max(1_000, "Poznámka může mít nejvýše 1 000 znaků.").optional(),
  website: z.literal(""),
  formStartedAt: z.number().int().positive(),
  idempotencyKey: z.uuid(),
  termsAccepted: z.literal(true, { error: "Potvrďte souhlas s podmínkami." }),
  privacyAccepted: z.literal(true, { error: "Potvrďte seznámení s ochranou údajů." }),
});

export type OrderInput = z.infer<typeof orderSchema>;

export function validateOrderTiming(formStartedAt: number, now = Date.now()) {
  return now - formStartedAt >= MIN_FORM_FILL_MS && formStartedAt <= now;
}

export function resolveOrder(input: OrderInput) {
  const selection = getOffering(input.courseId, input.branchId);
  if (!selection) return undefined;
  return { input, ...selection };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character] ?? character;
  });
}
