import mongoose, { Document, Model, Schema } from "mongoose";

interface IGame {
  name: string;
  address: string;
  numberOfPeople: number;
  date: Date;
  time: string;
  fieldNumber: number;
}

interface IGameDocument extends IGame, Document {
  gameId: string;
}

const gameSchema = new Schema<IGameDocument>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  fieldNumber: { type: Number, required: true },
});

// Transformation for JSON representation
gameSchema.set("toJSON", {
  transform: function (_doc, ret) {
    ret.gameId = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Game: Model<IGameDocument> = mongoose.model<IGameDocument>(
  "Game",
  gameSchema
);

export { IGame, IGameDocument, Game };
