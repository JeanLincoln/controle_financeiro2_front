import { z } from "zod";

export const LoginFormSchema = z.object({
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

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const loginFormDefaultValues: LoginFormSchemaType = {
  email: "",
  password: ""
};
