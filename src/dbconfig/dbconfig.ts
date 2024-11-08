import mongoose from "mongoose";
import { toast } from "sonner";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export default async function connectToDb() {
  if (connection.isConnected) {
    // console.log("Already connected to database.");
    return;
  }
  try {
    const db = await mongoose.connect(
      "mongodb+srv://sagarsendev:sagarsendev@styleloom.otwqr.mongodb.net/"
    );
    connection.isConnected = db.connections[0].readyState;
    mongoose.connection.on("connection", () => {
      // ! This callback can be used for testing / implementing middlewares
    });
    mongoose.connection.on("error", () => {
      toast.error("Error while connecting the database");
    });
  } catch (error: any) {
    toast.error(error.message);
    process.exit(1);
  }
}
