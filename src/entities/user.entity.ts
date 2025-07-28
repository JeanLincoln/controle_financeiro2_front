export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
