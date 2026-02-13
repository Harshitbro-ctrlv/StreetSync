import e from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.routes.js";

const app = e();
app.use(e.json());
app.use(cookieParser()); 
app.use(`/api/v1/user`,userRouter)

export default app