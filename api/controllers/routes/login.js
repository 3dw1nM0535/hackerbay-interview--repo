// Login route handler
import express from "express";

import User from "../../models/user";

const Router = express.Router();

Router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      const newUser = new User({
        username: req.body.username,
      });
      newUser.setPassword(req.body.password);
      newUser.save().then(result => res.status(200).json({ token: result.generateToken() }))
        .catch(err => res.status(400).json({ errors: { global: err } }));
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
