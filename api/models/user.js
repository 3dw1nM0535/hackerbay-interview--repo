import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import configs from "../../config/configs";

const Schema = mongoose.Schema;

// User data schema definition
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  passwordHash: {
    type: String,
  },
}, { versionKey: false, timestamps: true });

// Set password and store as hash(secure) in the database
userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

// Validate password during login
userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// Sign user data and send as jwt-token
userSchema.methods.generateToken = function generateToken() {
  return jwt.sign({
    username: this.username,
  }, configs.SECRET_KEY);
};

export default mongoose.model("User", userSchema);
