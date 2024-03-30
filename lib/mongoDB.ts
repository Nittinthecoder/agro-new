import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MOGODB_URL || "", {
      dbName: "AgroXPlanet_Admin",
    });

    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};
