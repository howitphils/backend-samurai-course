import { Router, Request } from "express";
import { db } from "../db/db";
import { InputVideoType } from "../types/videos-types";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(db.videos);
});

router.get("/:id", (req, res) => {
  const video = db.videos.find((video) => video.id === +req.params.id);
  if (!video) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json(video);
});

router.post("/", (req: Request<{}, {}, InputVideoType>, res) => {});

export default router;
