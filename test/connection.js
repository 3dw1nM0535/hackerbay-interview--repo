// Test for Database connection
import mongoose from "mongoose";

import User from "../api/models/user";

process.env.NODE_ENV = "test";

// Hook mongo connection before each test run
before((done) => {
  // connect
  mongoose.connect("mongodb://localhost/hackerbay-test");

  // catch connection error
  mongoose.connection.once("open", () => {
    User.remove({}, (err) => {
      if (err) return;
      console.log(`// We are set for test runs //`);
      done();
    });
  }).on("error", console.error.bind(console, "Connection error"));
});

// Drop collection before each test runs
beforeEach((done) => {
  // Drop collection
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});

