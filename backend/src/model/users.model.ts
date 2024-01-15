import mongoose, { Model, Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  role?: string; //admin, user
  created_at?: Date;
  updated_at?: Date;
}

interface IUserDocument extends IUser, Document {
  userId: string;
  token: string;
}

const userSchema = new Schema<IUserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  token: { type: String },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

// Transformation for JSON representation
userSchema.set("toJSON", {
  transform: function (_doc, ret) {
    ret.gameId = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);

export { IUser, IUserDocument, User };
