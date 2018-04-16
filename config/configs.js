import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  TEST_DB_URI: process.env.TEST_DB_URI,
};
