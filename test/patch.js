// Test for patching JSON object
import chai from "chai";
import chaiHttp from "chai-http";

import server from "../server";
import User from "../api/models/user";

const should = chai.should();

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

// Patching test
describe("Patch JSON object", () => {
  // Save user before test run
  let newUser;
  let token;
  beforeEach((done) => {
    newUser = new User({
      username: "edwinMoses",
    });
    newUser.setPassword("1234");
    newUser.save().then((user) => {
      token = user.generateToken();
      done();
    });
  });

  it("Should patch JSON object and return object", (done) => {
    chai.request(server)
      .post("/api/patch")
      .set("Authorization", "Bearer " + token)
      .send({
        myDoc: { foo: "bar", bar: "boo" },
        patchOp: { op: "replace", path: "/bar", value: "baz" },
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
      });
    done();
  });


});
