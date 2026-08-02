import { z } from "zod";

const isControlCharacter = (character: string) => {
  const codePoint = character.codePointAt(0) ?? 0;
  return codePoint <= 0x1f || codePoint === 0x7f;
};

const noHeaderControlCharacters = (value: string) =>
  [...value].every((character) => !isControlCharacter(character));

const noUnsafeMessageControlCharacters = (value: string) =>
  [...value].every((character) => {
    if (character === "\t" || character === "\n" || character === "\r") {
      return true;
    }

    return !isControlCharacter(character);
  });

export const contactTopics = [
  "career-engineering",
  "studio",
  "other",
] as const;

export const contactRequestSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(80)
      .refine(noHeaderControlCharacters, "Name contains unsupported characters."),
    email: z.string().trim().toLowerCase().email().max(254),
    message: z
      .string()
      .trim()
      .min(20)
      .max(5_000)
      .refine(
        noUnsafeMessageControlCharacters,
        "Message contains unsupported characters.",
      ),
    topic: z.enum(contactTopics),
    locale: z.enum(["hu", "en"]),
    privacyAccepted: z.literal(true),
    website: z.string().max(200),
    startedAt: z.number().int().positive(),
    turnstileToken: z.string().trim().min(1).max(2_048).optional(),
  })
  .strict();

export type ContactRequest = z.infer<typeof contactRequestSchema>;

export type ContactDelivery = Pick<
  ContactRequest,
  "email" | "locale" | "message" | "name" | "topic"
> & {
  requestId: string;
};

export interface ContactDeliveryProvider {
  send(delivery: ContactDelivery): Promise<void>;
}
