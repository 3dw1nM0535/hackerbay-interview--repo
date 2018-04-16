import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";

// Import configurations
import configs from "./config/configs";

// Init the express module
const app = express();

const options = {
  keepAlive: 1,
  connectTimeoutMS: 3000,
};

// Connect to Database
mongoose.connect(
  configs.MONGO_URI,
  options,
  (error) => {
    if (error) {
      console.error.bind(console, "Connection error:");
    }
  },
);

// Define PORT Number
const PORT = configs.PORT;

// Logging middleware
app.use(morgan("combined"));

// Parse application/json middleware
app.use(bodyParser.json());

// Any route handler
app.get("*", (req, res) => {
  res.status(200).json({});
});

// Listen for request
app.listen(PORT, () => console.log("API active!"));
