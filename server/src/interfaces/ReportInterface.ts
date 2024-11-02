import { ObjectId } from "mongoose";

export interface IReport {
  moodScore: {
    rating: string;
    comment: string;
  };
  anxietyScore: {
    rating: string;
    comment: string;
  };
  energyScore: {
    rating: string;
    comment: string;
  };
  socialScore: {
    rating: string;
    comment: string;
  };
  copingScore: {
    rating: string;
    comment: string;
  };
  user: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
