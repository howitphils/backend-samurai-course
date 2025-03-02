import { createServer } from "node:http";
import fs from "fs";

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

const read = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const server = createServer(async (request, response) => {
  await delay(5000);
  try {
    const data = await read("index.html");
    response.write(data);
    response.end();
  } catch (error) {
    response.write(error.message);
    response.end();
  }
});

server.listen(8008);
