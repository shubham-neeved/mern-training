import express from "express";

import { logger } from "./middleware/type.middleware.js";
import router from "./routes/routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use(router);

// Error middleware should always be last
app.use(errorMiddleware);

export default app;