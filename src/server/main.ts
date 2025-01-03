import express from "express";
import ViteExpress from "vite-express";

import { getRandomColor } from "./api/colors";

const app = express();
app.use(express.json());
app.get("/color", getRandomColor);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
