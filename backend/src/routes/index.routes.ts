import express from "express";
import gameRoutes from "./api/game.routes";

const router: express.Router = express.Router();

router.get("/", (_, res) => {
  res.send("this works");
});

router.use("/games", gameRoutes);

export default router;
