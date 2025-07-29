import type { User } from "@/entities/user.entity";

export interface AuthSessionParams {
  email: string;
  password: string;
}

export type AuthSessionResponse = User;

export interface RegisterUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate?: Date;
}

export type RegisterUserResponse = User;
