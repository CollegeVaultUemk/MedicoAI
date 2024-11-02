import { Schema, model, ObjectId } from "mongoose";
import { IReport } from "../interfaces/ReportInterface";

const reportSchema = new Schema<IReport>(
  {
    moodScore: {
      rating: String,
      comment: String,
    },
    anxietyScore: {
      rating: String,
      comment: String,
    },
    energyScore: {
      rating: String,
      comment: String,
    },
    socialScore: {
      rating: String,
      comment: String,
    },
    copingScore: {
      rating: String,
      comment: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<IReport>("Report", reportSchema);
