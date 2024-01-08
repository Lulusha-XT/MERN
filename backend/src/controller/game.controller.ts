import { IGame } from "../model/game.model";
import * as gameService from "../service/game.service";
import { Request, Response, Router } from "express";

const getAllGames = async (req: Request, res: Response, next: Function) => {
  try {
    const games = await gameService.getAllGames();
    return res.status(200).json(games);
  } catch (error) {
    return next(error);
  }
};

const createGame = async (req: Request, res: Response, next: Function) => {
  const game: IGame = {
    name: req.body.name,
    address: req.body.address,
    date: req.body.date,
    fieldNumber: req.body.fieldNumber,
    numberOfPeople: req.body.numberOfPeople,
    time: req.body.time,
  };
  try {
    const gameCreated = await gameService.createGame(game);
    res.status(201).json(gameCreated);
  } catch (error) {
    return next(error);
  }
};

const findGameById = async (req: Request, res: Response, next: Function) => {
  const { id } = req.params;
  try {
    const game = await gameService.findGameById(id);
    return res.status(200).json(game);
  } catch (error) {
    return next(error);
  }
};

const game_routes = (route: Router) => {
  route.get("/", getAllGames);
  route.post("/", createGame);
  route.get("/:id", findGameById);
};

export default game_routes;
