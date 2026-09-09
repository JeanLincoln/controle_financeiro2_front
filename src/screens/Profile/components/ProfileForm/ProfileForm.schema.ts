import { z } from "zod";

import type { User } from "@/entities/user.entity";

const MAX_NAME_LENGTH = 255;
const MAX_EMAIL_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

export const ProfileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "Informe seu primeiro nome")
    .max(MAX_NAME_LENGTH, "O primeiro nome deve ter no máximo 255 caracteres"),
  lastName: z
    .string()
    .min(1, "Informe seu sobrenome")
    .max(MAX_NAME_LENGTH, "O sobrenome deve ter no máximo 255 caracteres"),
  birthDate: z
    .date()
    .optional()
    .refine((date) => !date || date < new Date(), {
      message: "A data de nascimento deve estar no passado"
    }),
  email: z
    .string()
    .min(1, "Informe seu e-mail")
    .email("Informe um endereço de e-mail válido")
    .max(MAX_EMAIL_LENGTH, "O e-mail deve ter no máximo 255 caracteres"),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, "A senha deve ter pelo menos 8 caracteres")
    .max(MAX_PASSWORD_LENGTH, "A senha deve ter no máximo 128 caracteres")
    .regex(/[A-Z]/, "A senha deve conter uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter um caractere especial")
});

export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;

export function profileFormDefaultValues(user: User): ProfileFormSchemaType {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    birthDate: user.birthDate ? new Date(user.birthDate) : undefined
  };
}
