import express from "express";
import { videosRouter } from "./routes/videos-router";
import { SETTINGS } from "./settings";

export const app = express();

app.use(express.json());
app.use(SETTINGS.PATH.VIDEOS, videosRouter);

app.get("/", (req, res) => {
  res.send("Hello, world");
});
