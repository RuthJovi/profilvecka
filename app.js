import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";
// import authRouter from "./routes/auth.routes.js";
// import subRouter from "./routes/subscription.routes.js";
// import userRouter from "./routes/user.routes.js";
import { connect } from "mongoose";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use("/api/v1/auth", authRouter);
//app.use("/api/v1/users", userRouter);
//app.use("/api/v1/subscriptions", subRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("TEST");
});

app.get("/prrr", (req, res) => {
  res.send("Brumbrum");
});

console.log("PORT =", PORT);

app.listen(PORT,"0.0.0.0", async() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Server is running on http://10.159.154.189:${PORT}`);
await connectDB();
});
