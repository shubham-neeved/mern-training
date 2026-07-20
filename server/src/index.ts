import dotenv from "dotenv";
import express from "express";

import { logger } from "./middleware/type.middleware.js";
import router from "./routes/routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { connectDB } from "./config/database.js";

dotenv.config();

const app = express();

app.use(logger);
app.use(express.json());

app.use(router);

// Error middleware should always be last
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });