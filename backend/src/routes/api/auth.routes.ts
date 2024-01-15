import { auth_routes } from "../../controller/auth.controller";
import express from "express";
const authRoutes = express.Router();
auth_routes(authRoutes);

export default authRoutes;
