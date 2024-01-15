import { Request, Response, Router } from "express";
import * as authService from "../service/auth.service";
import { verifyToken } from "../middleware/auth";
import { IUser } from "../model/users.model";
import { IRequest } from "../interface/irequest.interface";

const signUp = async (req: Request, res: Response, next: Function) => {
  const user: IUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const newUser = await authService.signUP(user);
    return res
      .status(201)
      .json({ message: "succesfully signedUp", data: newUser });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req: Request, res: Response, next: Function) => {
  const { email, password } = req.body;
  try {
    const response = await authService.signIn(email, password);
    return res
      .status(200)
      .json({ message: "Succesfully signedIn", data: response });
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req: IRequest, res: Response, next: Function) => {
  verifyToken(req, res, next);
  try {
    console.log("HAlLOOOOOOOO", req.headers.authorization);
    const username = req.user?.username;
    const email = req.user?.email;
    const role = req.user?.role;
    res.status(200).json({ data: username, email, role });
  } catch (error) {
    return next(error);
  }
};

export const auth_routes = (route: Router) => {
  route
    .post("/signIn", signIn)
    .post("/signUp", signUp)
    .get("/currentUser", getCurrentUser);
};
