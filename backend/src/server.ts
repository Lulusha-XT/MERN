import { app } from "./app";
import connectDB from "./config/db.connect";

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to db ✅");
    app.listen(app.get("port"));
    console.log(
      `Server is running on port http://localhost:${app.get("port")}`
    );
  } catch (error) {
    console.log("Failed to connect to the db 🤕🤕");
    console.log(error);
  }
};

startServer();
