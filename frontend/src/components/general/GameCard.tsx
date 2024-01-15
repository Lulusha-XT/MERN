import React from "react";
import { IGame } from "../../interfaces/Game";
import "../general/GameCard.css";
interface Props {
  game: IGame;
}
const GameCard = ({ game }: Props) => {
  return (
    <div className="game-card">
      <h2>{game.name}</h2>
      <p>{game.address}</p>
      <p>{game.numberOfPeople}</p>
      <p>{game.time ? game.time : "no time assigned yet"}</p>
      <p>
        {game.date
          .toString()
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("-")
          .replace(/-/g, "/")}
      </p>
    </div>
  );
};

export default GameCard;
