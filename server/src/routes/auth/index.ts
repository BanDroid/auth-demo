import { Router } from "express";
import {
  getUsers,
  postUser,
  signinUser,
  signoutUser,
  updateUser,
} from "./controller";
import { verifyTokenMiddleware } from "../../middlewares/verifyToken";
import { refreshTokenMiddleware } from "../../middlewares/refreshToken";

const authRoute = Router();
authRoute.post("/signin", signinUser);
authRoute.route("/token").get(refreshTokenMiddleware).delete(signoutUser);
authRoute
  .route("/")
  .get(verifyTokenMiddleware, getUsers)
  .post(postUser)
  .put(verifyTokenMiddleware, updateUser);

export default authRoute;
