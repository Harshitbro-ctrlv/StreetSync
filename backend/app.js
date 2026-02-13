import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/user.routes.js";

const app = e();

app.use(
  cors({
    origin: "https://street-sync.vercel.app",
    credentials: true,
  })
);

app.use(e.json());
app.use(cookieParser());

app.use(`/api/v1/user`, userRouter);

export default app;
