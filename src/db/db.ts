import { OutputVideoType } from "../types/videos-types";

type DbType = {
  videos: OutputVideoType[];
};

export const db: DbType = {
  videos: [],
};

export const setDb = () => {
  db.videos = [];
};
