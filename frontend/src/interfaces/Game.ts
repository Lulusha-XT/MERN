export interface IGame {
  name: string;
  address: string;
  numberOfPeople: number;
  date: Date;
  time: string;
  fieldNumber: number;
}

export interface IGameDocument extends IGame {
  gameId: string;
}
