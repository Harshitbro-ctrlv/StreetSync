import { Router } from "express";
import { multerMiddleware } from "../middleware/multer.middleware.js";
import {registerUser,loginUser, searchForVendors} from "../controllers/user.controller.js"
import verifyJwt from "../middleware/auth.middleware.js";
const userRouter = Router();
userRouter.post('/register',multerMiddleware,registerUser)
userRouter.post('/login',multerMiddleware,loginUser)
userRouter.get('/searchVendors',verifyJwt,searchForVendors)
export  {userRouter}