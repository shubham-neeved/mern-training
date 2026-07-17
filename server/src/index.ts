import dotenv from "dotenv";
import express from "express";
import { logger } from "./middleware/type.middleware.js";
import router from "./routes/routes.js";
import { getUsers } from "./controllers/users.controller.js";
import errorMiddleware from "./middleware/error.middleware.js";
dotenv.config();
const app = express();
app.use(logger);
app.use(express.json());
app.use(errorMiddleware);
app.use(router);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
