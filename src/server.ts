import express from "express";
import firstRouter from "./router";

const app = express();
const port = process.env.PORT || 3003;

app.use("/", firstRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
