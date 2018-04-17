import express from "express";
import patchDoc from "jsonpatch";

import isAuthenticated from "../middlewares/authenticate";

const Router = express.Router();

// Apply authenticate middleware
Router.use(isAuthenticated);

Router.post("/", (req, res) => {
  const patchedDoc = patchDoc.apply_patch(req.body.myDoc, req.body.patchOp);
  res.status(200).json(patchedDoc);
});

export default Router;
