import express from "express";
import { videosRouter } from "./routes/videos-router";
import { SETTINGS } from "./settings";
import { db } from "./db/db";

export const app = express();

app.use(express.json());
app.use(SETTINGS.PATH.VIDEOS, videosRouter);

app.get("/", (req, res) => {
  res.send("Hello, world");
});
app.delete("testing/all-data", (req, res) => {
  db.videos = [];
  res.sendStatus(204);
});
