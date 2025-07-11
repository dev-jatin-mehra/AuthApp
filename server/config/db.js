import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGOURI}/mern-auth`);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error");
    process.exit(1);
  }
};

export default connectDB;
