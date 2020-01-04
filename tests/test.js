const chaiHttp = require("chai-http");
const app = require("./../server");
const chai = require("chai");

// Configuring Chai
chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("Get / ", () => {
    // Should get all the users
    it("should get all users", done => {
      chai
        .request(app)
        .get("/api/v1/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
        });
    });

    // Should get a single user
  });
});
