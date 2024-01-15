import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { IUser } from "../model/users.model";
import dotenv from "dotenv";
import { IRequest } from "../interface/irequest.interface";

// Environment variables
dotenv.config();
const secret = process.env.TOKEN_SECRET;
console.log("Token Secret:", secret);
if (!secret) {
  throw new Error("Token secret not configured");
}

export const assignAccessToken = (user: IUser): string => {
  const expiresIn = "1h";
  try {
    const userObject = JSON.parse(JSON.stringify(user));
    return jwt.sign(userObject, secret, { expiresIn });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const verifyToken = (req: IRequest, res: Response, next: Function) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("CIAOOOOOOO", token);

  if (!token) return res.status(403).send({ message: "No Token Provided" });

  try {
    const decodedToken = jwt.verify(token, secret) as IUser;
    // console.log("Print Message", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
