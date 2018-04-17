import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";

// Import configurations
import configs from "./config/configs";

// Import routes
import signup from "./api/controllers/routes/signup";
import login from "./api/controllers/routes/login";
import patch from "./api/controllers/routes/patch";
import upload from "./api/controllers/routes/upload";

// Set environment to development
process.env.NODE_ENV = "dev";

// Init the express module
const app = express();

const options = {
  autoReconnect: true,
  connectTimeoutMS: 30000,
  reconnectTries: 30,
};

// Connect to Database
mongoose.connect(configs.MONGO_URI, options);

// Define PORT Number
const PORT = configs.PORT;

if (configs.NODE_ENV !== "test") {
  // Logging middleware
  app.use(morgan("combined"));
}

// Parse application/json middleware
app.use(bodyParser.json());


// Any route handler
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

// Mount routes
app.use("/api/signup", signup);
app.use("/api/authenticate", login);
app.use("/api/patch", patch);
app.use("/api/thumbnails", upload);

// Listen for request
const server = app.listen(PORT);

export default server;
