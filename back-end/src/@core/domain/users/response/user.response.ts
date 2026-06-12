import { UserRole } from "../enums/enum.type.user";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  active: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}