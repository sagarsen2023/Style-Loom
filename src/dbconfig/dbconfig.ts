import mongoose from "mongoose";
import { toast } from "sonner";

export default async function connectToDb(){
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    mongoose.connection.on('connection', () => {
      // ! This callback can be used for testing / implementing middlewares
    })
    mongoose.connection.on('error', () => {
        toast.error("Error while connecting the database")
    })
  } catch (error : any) {
    toast.error(error.message)
  }
}