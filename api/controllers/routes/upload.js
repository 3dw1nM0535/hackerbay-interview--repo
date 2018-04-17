// Thumbnail requests handler
import express from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import fs from "fs";

import isAuthenticated from "../middlewares/authenticate";

import configs from "../../../config/configs";

const upload = multer({ dest: "uploads/" });

const Router = express.Router();

// Apply middleware for requests
Router.use(isAuthenticated);

// Cloudinary configurations
cloudinary.config({
  cloud_name: configs.CLOUD_NAME,
  api_key: configs.API_KEY,
  api_secret: configs.API_SECRET,
});

Router.post("/uploads", upload.single("image"), (req, res) => {
  cloudinary.v2.uploader.upload(
    "./uploads/" + req.file.filename,
    { width: 50, height: 50, crop: "fit" },
    (err, result) => {
      if (err) {
        res.status(404).json({ message: "Something went wrong" });
      }
      res.status(200).json({ imageURL: result.secure_url });
    },
  );
  fs.unlink(req.file.path);
});

export default Router;
