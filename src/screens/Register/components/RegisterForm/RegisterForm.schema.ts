import { z } from "zod";

export const RegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "Primeiro nome é obrigatório")
    .max(50, "Primeiro nome é muito longo"),
  lastName: z
    .string()
    .min(1, "Sobrenome é obrigatório")
    .max(50, "Sobrenome é muito longo"),
  birthDate: z
    .date()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;

        const today = new Date();
        return date < today;
      },
      {
        message: "Data de nascimento deve ser no passado"
      }
    ),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Por favor, insira um endereço de email válido")
    .max(254, "Email é muito longo"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(128, "Senha é muito longa")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um caractere especial")
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

export const registerFormDefaultValues: RegisterFormSchemaType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDate: undefined
};
