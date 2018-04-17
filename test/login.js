// Login test
import chai from "chai";
import chaiHttp from "chai-http";
import assert from "assert";

import server from "../server";
import User from "../api/models/user";

const should = chai.should();

process.env.NODE_ENV = "test";

chai.use(chaiHttp);
// Login test
describe("/POST login", () => {
  let newUser;
  beforeEach((done) => {
    newUser = new User({
      username: "edwinMoses",
    });
    newUser.setPassword("1234");
    newUser.save().then(() => {
      assert(newUser.isNew === false);
      done();
    });
  });

  it("User should login and return token", (done) => {
    chai.request(server)
      .post("/api/authenticate")
      .send({ username: "edwinMoses", password: "1234" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  });

  it("Should return error for wrong passwod", (done) => {
    chai.request(server)
      .post("/api/authenticate")
      .send({ username: "edwinMoses", password: "4646" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Wrong password");
        done();
      });
  });

  it("Should return error if user not found", (done) => {
    chai.request(server)
      .post("/api/authenticate")
      .send({ username: "mikeBlake", password: "1234" })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User not found. Please signup first");
      });
    done();
  });

  it("Should return error on empty username", (done) => {
    chai.request(server)
      .post("/api/authenticate")
      .send({ username: "", password: "1234" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eql("Invalid credentials");
        done();
      });
  });

  it("Should return error on empty request", (done) => {
    chai.request(server)
      .post("/api/authenticate")
      .send({ username: "", password: "" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eql("Invalid credentials");
        done();
      });
  });

  it("Should return error on empty password", (done) => {
    chai.request(server)
      .post("/api/authenticate")
      .send({ username: "edwinMoses", password: "" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eql("Invalid credentials");
        done();
      });
  });
});
