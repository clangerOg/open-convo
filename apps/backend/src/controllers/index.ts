import { Router } from "express";
import { BASE_API_URL } from "src/consts";
import { authController } from "./auth";

const api = Router().use(authController);

export default Router().use(BASE_API_URL, api);
