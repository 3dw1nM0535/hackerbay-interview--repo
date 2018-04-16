import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  TEST_DB_URI: process.env.TEST_DB_URI,
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
};
