import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

// User data schema definition
const userSchema = new Schema({
  username: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
});

// Set password and store as hash(secure) in the database
userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

export default mongoose.model("User", userSchema);
