import mongoose, { Connection } from "mongoose";

const mongoConnection = async (url: string): Promise<Connection> => {
  return mongoose.connect(url).then(() => {
    console.log("Database Connected");
    return mongoose.connection;
  });
};

export default mongoConnection;
