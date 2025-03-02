import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, (err) => {
  if (err) console.log(err.message);
  else console.log(`listening on port ${port}`);
});
