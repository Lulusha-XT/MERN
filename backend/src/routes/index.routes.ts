import express from "express";
import gameRoutes from "./api/game.routes";
import authRoutes from "./api/auth.routes";

const router: express.Router = express.Router();

router.get("/", (_, res) => {
  res.send("this works");
});

router.use("/games", gameRoutes);
router.use("/auth", authRoutes);

export default router;
