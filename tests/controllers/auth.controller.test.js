// /* eslint-disable */
// const chai = require("chai");
// const faker = require("faker");
// const sinon = require("sinon");
// const sinonChai = require("sinon-chai");
// const rewire = require("rewire");

// const { expect } = chai;

// const User = require("../../models/user.model");
// const authController = rewire("../../controllers/auth.controller");

// chai.use(sinonChai);

// let sandbox = null;

// describe("Users Controller", () => {
//   let req = {
//     user: { id: faker.random.number() },
//     body: { email: faker.internet.email(), password: faker.internet.password() }
//   };

//   let res = {
//     json: function() {
//       return this;
//     },
//     status: function() {
//       return this;
//     }
//   };

//   beforeEach(() => {
//     sandbox = sinon.sandbox.create();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   describe("get resource", () => {
//     it("should return resource when called", () => {
//       sandbox.spy(console, "log");
//       sandbox.spy(res, "json");
//     });

//     return authController.login(req, res).then(() => {
//       expect(console.log).to.have.been.called;
//       expect(res.json.calledWith({ data: "document" })).to.be.ok;
//       expect(res.json).to.have.been.calledWith({ data: resource });
//     });
//   });
// });
