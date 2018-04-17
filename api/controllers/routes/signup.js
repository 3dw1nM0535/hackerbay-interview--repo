// Signup route handler
import express from "express";

import User from "../../models/user";
import parseErrors from "../../../utils/parseError";

const Router = express.Router();

Router.post("/", (req, res) => {
  const newUser = new User({
    username: req.body.username,
  });
  newUser.setPassword(req.body.password);
  newUser.save().then(user => res.status(200).json({ user: user.generateToken() }))
    .catch(err => res.status(400).json({ errors: { global: parseErrors(err.errors) } }));
});

export default Router;
