import type { User } from "@/entities/user.entity";

export interface AuthSessionParams {
  email: string;
  password: string;
}

export type AuthSessionResponse = User;
