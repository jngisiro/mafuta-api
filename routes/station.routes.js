const express = require("express");

const stationController = require("../controllers/station.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Protect all routes
router.use(authController.protect);

router
  .route("/")
  .get(
    authController.restrictTo("superadmin"),
    stationController.getAllStations
  )
  .post(stationController.createStation);

router
  .route("/createAttendant")
  .post(
    authController.restrictTo("manager"),
    stationController.createAttendant
  );

router
  .route("/within-radius/:distance/center/:pin/unit/:unit")
  .get(stationController.getCloseStation);

router.route("/distances/:pin/unit/:unit").get(stationController.getDistances);

router
  .route("/:id")
  .get(stationController.getStation)
  .patch(
    authController.restrictTo("superadmin", "admin"),
    stationController.updateStation
  )
  .delete(
    authController.restrictTo("superadmin", "admin"),
    stationController.deleteStation
  );

module.exports = router;
