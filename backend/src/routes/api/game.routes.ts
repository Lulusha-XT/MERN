import express from "express";
import game_routes from "../../controller/game.controller";

const gameRoutes = express.Router();

game_routes(gameRoutes);

export default gameRoutes;
