// Sign up route handler
import express from "express";

import User from "../../models/user";
import parseErrors from "../../utils/parseError";

const Router = express.Router();

Router.post("/", (req, res) => {
  const username = req.body.username;
  const newUser = new User({
    username,
  });
  newUser.setPassword(req.body.password);
  newUser.save().then(() =>
    res.json({ message: "User created successfully" }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default Router;
