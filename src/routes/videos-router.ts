import { Router, Request, Response } from "express";
import { db } from "../db/db";
import {
  InputVideoTypePost,
  InputVideoTypeUpdate,
  OutputVideoType,
} from "../types/videos-types";
import { postVideoBodyValidation } from "../validators/validators";
import { OutputErrorsType } from "../types/output-error-type";

const videosController = {
  getVideos: (req: Request, res: Response) => {
    res.status(200).json(db.videos);
  },
  getVideoById: (req: Request, res: Response) => {
    const video = db.videos.find((video) => video.id === +req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(video);
  },
};

export const videosRouter = Router();

videosRouter.get("/", videosController.getVideos);

videosRouter.get("/:id", videosController.getVideoById);

videosRouter.post("/", (req: Request<{}, {}, InputVideoTypePost>, res) => {
  const errors = postVideoBodyValidation(req.body);
  if (errors.errorsMessages.length) {
    res.status(400).json(errors);
    return;
  }
  const newVideo: OutputVideoType = {
    ...req.body,
    id: Math.random() * 1000,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString() + 1,
  };
  db.videos.unshift(newVideo);
  res.status(201).json(newVideo);
});

videosRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, InputVideoTypeUpdate>, res) => {
    const video = db.videos.find((video) => video.id === +req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    const {
      author,
      availableResolutions,
      canBeDownloaded,
      minAgeRestriction,
      publicationDate,
      title,
    } = req.body;
    const errors: OutputErrorsType = {
      errorsMessages: [],
    };

    if (!author || !author.trim() || author.length > 40) {
      errors.errorsMessages.push({
        message: "Invalid",
        field: "author",
      });
    }

    res.sendStatus(204);
  }
);

videosRouter.delete("/:id", (req: Request<{ id: string }>, res) => {
  const video = db.videos.find((video) => video.id === +req.params.id);
  if (!video) {
    res.sendStatus(404);
    return;
  }
  db.videos = db.videos.filter((vid) => vid.id !== +req.params.id);
  res.sendStatus(204);
});
