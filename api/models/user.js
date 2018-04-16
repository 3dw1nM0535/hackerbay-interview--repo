import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

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

// Enforce uniqueness to username
userSchema.plugin(uniqueValidator, { message: "This username is already taken" });

// Set password and store as hash(secure) in the database
userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

export default mongoose.model("User", userSchema);
