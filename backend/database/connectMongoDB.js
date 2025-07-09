import mongoose from "mongoose";

const connectMongoDB = async () => { 
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error connect to mongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
