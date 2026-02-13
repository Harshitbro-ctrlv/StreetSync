import { Router } from "express";
import { multerMiddleware } from "../middleware/multer.middleware.js";
import {registerUser} from "../controllers/user.controller.js"
const userRouter = Router();
userRouter.post('/register',multerMiddleware,registerUser)
export  {userRouter}