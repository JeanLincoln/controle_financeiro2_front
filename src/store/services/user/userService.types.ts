import type { User } from "@/entities/user.entity";

export interface FindUserByIdParams {
  id: number;
}

export type FindUserByIdResponse = User;

export type UpdateUserParams = Pick<
  User,
  "firstName" | "lastName" | "email" | "birthDate"
> & {
  password: string;
};
