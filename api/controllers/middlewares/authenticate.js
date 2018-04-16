import jwt from "jsonwebtoken";

import User from "../../api/models/user";
import configs from "../../config/configs";

export default (req, res, next) => {
  const header = req.headers.authoriation;
  let token;
  if (header) token = header.split(' ')[0];

  if (token) {
    jwt.verify(token, configs.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      }
      User.findOne({ username: decoded.username }).then((user) => {
        if (user) {
          req.user = user;
          next();
        }
      });
    });
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
};
