import mongoose from "mongoose";

export default async function connectToDb(){
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    mongoose.connection.on('connection', () => {
        console.log("Database Connected Successfully.")
    })
    mongoose.connection.on('error', () => {
        console.log("Error while connecting the database")
    })
  } catch (error : any) {
    console.log(error.message)
  }
}