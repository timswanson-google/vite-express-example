import express from "express";
import ViteExpress from "vite-express";

import { getRandomColor } from "./api/colors";

const app = express();
app.use(express.json());
app.get("/color", getRandomColor);

const port = +(process.env.PORT || 3000);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
