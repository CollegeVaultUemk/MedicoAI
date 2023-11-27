import { Model, ObjectId } from "mongoose";
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "user" | "doctor" | "admin";
    AIChat: ObjectId[];
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
interface IUserMethods {
    matchPassword: (enteredPassword: string) => Promise<boolean>;
    generateToken: () => string;
    isModified: (path?: string | string[]) => boolean;
    generateResetPasswordToken: () => string;
}
type UserModel = Model<IUser, object, IUserMethods>;
declare const _default: UserModel;
export default _default;
