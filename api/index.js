import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// Import configurations
import configs from "./config/configs";

// Init the express module
const app = express();

// Connect to Database
mongoose.connect(configs.MONGO_URI);

// Define PORT Number
const PORT = configs.PORT;

// parse req.body middleware
app.use(bodyParser.json());

// Listen for request
app.listen(PORT, () => console.log("API active!"));
