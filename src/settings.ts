import { config } from "dotenv";
config(); // добавление переменных из файла .env в process.env

export const settings = {
  PORT: process.env.PORT || 3003,
  PATH: "/videos",
};
