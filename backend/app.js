import e from "express";
import { userRouter } from "./routes/user.routes.js";

const app = e();
app.use(e.json());
app.use(`/api/v1/user`,userRouter)

export default app