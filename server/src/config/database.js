import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI; //read env file in node
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

let connection = {};
export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing MongoDB connection");
      return;
    }
    const db = await mongoose.connect(mongoUri, {
      dbName: "instapics", //db name for the project
      maxPoolSize: 10, // maximum connrction per pool size
      serverSelectionTimeoutMS: 5000, // how long to try establish connection
      socketTimeoutMS: 4500, //how long to establish a socket
    });
    //readystate === 1 means the connection was successfull
    connection.isConnected = db.connections[0].readyState === 1;
    if (connection.isConnected) {
      console.log("MongoDB connection successfully");
      // handles connection event
      mongoose.connection.on("error", (err) => {
        console.error("x MongoDB connection error:", err);
      });
      mongoose.connection.on("disconnection", () => {
        console.log("X MongoDB disconnection");
        connection.isConnected = false;
      });
      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("MongoDB Connection was closed through app termination");
        process.exit(0);
      });
    }
  } catch (error) {
    console.log("X MongoDB connection error:", error.message);
    connection.isConnected = false;
    throw new Error(`failed to connect to MongoDB: ${error.message}`);
  }
};
