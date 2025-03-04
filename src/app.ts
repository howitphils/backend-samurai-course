import express from "express";
import videosRouter from "./routes/router";
import { settings } from "./settings";

export const app = express();

app.use(express.json());
app.use(settings.PATH, videosRouter);

app.get("/", (req, res) => {
  res.send("Hello, world");
});
