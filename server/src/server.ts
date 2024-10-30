import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";

const port = process.env.PORT;

const appStart = async (): Promise<void> => {
  try {
    mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => console.log("Connected to Database"))
      .catch((err) => console.log(`Error: ${err}`));
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

appStart();
