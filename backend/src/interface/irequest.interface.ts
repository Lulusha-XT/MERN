import { IUser } from "../model/users.model";
import { Request } from "express";

export interface IRequest extends Request {
  user?: IUser;
}
