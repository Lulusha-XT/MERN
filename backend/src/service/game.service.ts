import { Game, IGame } from "../model/game.model";

export const getAllGames = async () => {
  try {
    const games = await Game.find();
    return games;
  } catch (error) {
    throw new Error(`Could not get the games ${error}`);
  }
};

export const createGame = async (game: IGame) => {
  try {
    const gameCreated = await Game.create(game);
    return gameCreated;
  } catch (error) {
    throw new Error(`Could not create game ${game}`);
  }
};

export const findGameById = async (id: string) => {
  try {
    const game = await Game.findById(id);
    return game;
  } catch (error) {
    throw new Error(`Could not get game ${error}`);
  }
};
