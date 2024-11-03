import { ObjectId } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "doctor" | "admin";
  AIChat: ObjectId[];
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
