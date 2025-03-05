import { Router, Request, Response } from "express";
import { db } from "../db/db";
import {
  InputVideoTypePost,
  InputVideoTypeUpdate,
  OutputVideoType,
} from "../types/videos-types";
import {
  postVideoBodyValidation,
  updateVideoBodyValidation,
} from "../validators/validators";

const findVideoHelper = (id: string) =>
  db.videos.find((video) => video.id === +id);

const videosController = {
  getVideos: (req: Request, res: Response) => {
    res.status(200).json(db.videos);
  },
  getVideoById: (req: Request<{ id: string }>, res: Response) => {
    const video = findVideoHelper(req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(video);
  },
  postVideo: (req: Request<{}, {}, InputVideoTypePost>, res: Response) => {
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
      publicationDate: new Date().toISOString(),
    };
    db.videos.unshift(newVideo);
    res.status(201).json(newVideo);
  },
  updateVideo: (
    req: Request<{ id: string }, {}, InputVideoTypeUpdate>,
    res: Response
  ) => {
    const video = findVideoHelper(req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }

    const errors = updateVideoBodyValidation(req.body);
    if (errors.errorsMessages.length) {
      res.status(400).json(errors);
      return;
    }

    db.videos = db.videos.map((vid) => {
      if (video.id === vid.id) {
        return { ...vid, ...req.body };
      } else {
        return vid;
      }
    });
    res.sendStatus(204);
  },
  deleteVideo: (req: Request<{ id: string }>, res: Response) => {
    const video = findVideoHelper(req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    db.videos = db.videos.filter((vid) => vid.id !== +req.params.id);
    res.sendStatus(204);
  },
};

export const videosRouter = Router();

videosRouter.get("/", videosController.getVideos);

videosRouter.get("/:id", videosController.getVideoById);

videosRouter.post("/", videosController.postVideo);

videosRouter.put("/:id", videosController.updateVideo);

videosRouter.delete("/:id", videosController.deleteVideo);

videosRouter.delete("/testing/all-data", (req, res) => {
  db.videos = [];
  res.sendStatus(204);
});
