import { ObjectId } from "mongoose";

export interface IBard {
  chat: {
    chatName: string | null | undefined;
    question: string | null | undefined;
    answer: string | null | undefined;
  }[];
  user: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
