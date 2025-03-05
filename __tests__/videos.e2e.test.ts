import { req } from "./test-helpers";
import { SETTINGS } from "../src/settings";
import { setDb } from "../src/db/db";

describe("/videos", () => {
  beforeAll(async () => {
    // очистка базы данных перед началом тестирования
    setDb();
  });

  it("should get empty array", async () => {
    const res = await req.get(SETTINGS.PATH.VIDEOS); // проверяем наличие эндпоинта
    console.log(res.body); // можно посмотреть ответ эндпоинта

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0); // проверяем ответ эндпоинта
  });

  let videoId = "";
  it("should add a video to db", async () => {
    const res = await req.post(SETTINGS.PATH.VIDEOS).send({
      title: "string",
      author: "string",
      availableResolutions: ["P144"],
    });

    videoId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("author");
  });

  it("should get not empty array", async () => {
    const res = await req.get(SETTINGS.PATH.VIDEOS);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should get the video by id", async () => {
    const res = await req.get(SETTINGS.PATH.VIDEOS + `/${videoId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("publicationDate");
  });

  it("should update the video", async () => {
    const res = await req.put(SETTINGS.PATH.VIDEOS + `/${videoId}`).send({
      title: "hi",
      author: "Viktor",
      availableResolutions: ["P144"],
      canBeDownloaded: false,
      minAgeRestriction: 18,
      publicationDate: "2025-03-05T06:25:43.937Z",
    });

    expect(res.status).toBe(204);
  });

  it("should not add a video with invalid properites to db", async () => {
    const res = await req.post(SETTINGS.PATH.VIDEOS).send({
      title: "asdasdasdasdasdasdasdasdadaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      author: "",
      availableResolutions: ["P144", "Invalid", "P720"],
    });
    console.log(res.body);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errorsMessages");
  });

  it("should not get the video by not existing id", async () => {
    const res = await req.get(SETTINGS.PATH.VIDEOS + "/22");

    expect(res.status).toBe(404);
  });

  it("should not update the video with incorrect input values", async () => {
    const res = await req.put(SETTINGS.PATH.VIDEOS + `/${videoId}`).send({
      title:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      author: "",
      availableResolutions: ["P1442"],
      canBeDownloaded: null,
      minAgeRestriction: -18,
      publicationDate: "",
    });

    console.log(res.body);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errorsMessages");
  });

  it("should delete the video", async () => {
    const res = await req.delete(SETTINGS.PATH.VIDEOS + `/${videoId}`);

    expect(res.status).toBe(204);
  });
});
