import { Schema, model, ObjectId } from "mongoose";

interface IBard {
  chat: {
    chatName: string | null | undefined;
    question: string | null | undefined;
    answer: string | null | undefined;
  }[];
  user: ObjectId;
}

const bardSchema = new Schema<IBard>(
  {
    chat: [
      {
        chatName: String,
        question: String,
        answer: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<IBard>("Bard", bardSchema);
