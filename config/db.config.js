import mongoose from "mongoose";

export async function connectToDB() {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Connected to db: ${dbConnect.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}
