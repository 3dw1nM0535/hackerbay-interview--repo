// Login route handler
import express from "express";

import User from "../../models/user";

const Router = express.Router();

Router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.status(404).json({ message: "User not found. Please signup first" });
    } else if (user) {
      if (!user.isValidPassword(req.body.password)) {
        res.status(401).json({ message: "Wrong password" });
      }
      if (user.isValidPassword(req.body.password)) {
        res.status(200).json({ token: user.generateToken() });
      }
    }
  });
});

export default Router;
