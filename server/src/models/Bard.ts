import { Schema, model, ObjectId } from "mongoose";
import { IBard } from "../interfaces/BardInterface";

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
