import { IGame } from "../model/games.model";
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
    res
      .status(201)
      .json({ message: "created successfully", data: gameCreated });
  } catch (error) {
    return next(error);
  }
};

const findGameById = async (req: Request, res: Response, next: Function) => {
  const { id } = req.params;
  try {
    const game = await gameService.findGameById(id);
    return res.status(202).json(game);
  } catch (error) {
    return next(error);
  }
};

const updateGame = async (req: Request, res: Response, next: Function) => {
  const { id } = req.params;
  const game: IGame = {
    name: req.body.name,
    address: req.body.address,
    date: req.body.date,
    fieldNumber: req.body.fieldNumber,
    numberOfPeople: req.body.numberOfPeople,
    time: req.body.time,
  };
  console.log(game, id);
  try {
    const gameUpdated = await gameService.findByIdAndUpdate(id, game);
    return res
      .status(200)
      .json({ message: "updated successfully", data: gameUpdated });
  } catch (error) {
    return next(error);
  }
};

const deleteGame = async (req: Request, res: Response, next: Function) => {
  const { id } = req.params;
  try {
    const deletedGame = await gameService.deleteGame(id);
    return res
      .status(203)
      .json({ message: "deleted successfully", data: deletedGame });
  } catch (error) {
    return next(error);
  }
};

const game_routes = (route: Router) => {
  route.get("/", getAllGames);
  route.post("/", createGame);
  route.put("/:id", updateGame);
  route.delete("/:id", deleteGame);
  route.get("/:id", findGameById);
};

export default game_routes;
