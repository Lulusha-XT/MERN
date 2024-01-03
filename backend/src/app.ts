import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import indexRoutes from "./routes/index.routes";
import errorHandler from "./middleware/errors";
const app: Application = express();
const address: string = "8000";

// setting
app.set("port", process.env.PORT || address);

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//  here we will import routes;
app.use("/api", indexRoutes);

// Error handler
app.use(errorHandler);

// here we will declare the routes path
app.get("/", (req: Request, res: Response) => {
  res.send("Server Is WORKING !!✅✅");
});

// Public
app.use("uploads", express.static(path.resolve("uploads")));

export { app };
