import { Connection } from "mongoose";
declare const mongoConnection: (url: string) => Promise<Connection>;
export default mongoConnection;
