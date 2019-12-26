const express = require("express");

const router = express.Router();

const controller = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

router.patch("/updateMe", authController.protect, controller.updateMe);
router.delete("/deleteMe", authController.protect, controller.deleteMe);

router
  .route("/")
  .get(controller.getAllUsers)
  .post(controller.createUser);

router
  .route("/:id")
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = router;
