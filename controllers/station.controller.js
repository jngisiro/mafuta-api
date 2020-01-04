const catchAsync = require("../utils/catchAsync");
const Station = require("../models/station.model");
const resHandler = require("./responseHandler");
const AppError = require("../utils/app-error");
const authController = require("./auth.controller");

const document = "station";

exports.getAllStations = resHandler.getAll(Station);

exports.getStation = resHandler.getOne(Station, document);

exports.updateStation = resHandler.updateOne(Station, document);

exports.deleteStation = resHandler.deleteOne(Station, document);

exports.createStation = catchAsync(async (req, res, next) => {
  const station = await Station.create({
    name: "name"
  });
});

exports.createAttendant = catchAsync(async (req, res, next) => {
  req.body.userrole = "attendant";
  authController.signup(req, res, next);
});

// Get all stations that are within a given radius from a defined point
exports.getCloseStation = catchAsync(async (req, res, next) => {
  const { distance, pin, unit } = req.params;
  const [lat, long] = pin.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !long)
    next(
      new AppError(
        "Please provide your co-ordinates in the format lat,lng",
        500
      )
    );

  const stations = await Station.find({
    location: { $geoWithin: { $centerSphere: [[long, lat], radius] } }
  });

  res.status(200).json({
    status: "Success",
    results: stations.length,
    data: stations
  });
});

// Get the distances of all stations from a defined point
exports.getDistances = catchAsync(async (req, res, next) => {
  const { pin, unit } = req.params;
  const [lat, long] = pin.split(",");

  if (!lat || !long)
    next(
      new AppError(
        "Please provide your co-ordinates in the format lat,lng",
        500
      )
    );

  const distances = await Station.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [long * 1, lat * 1]
        },

        distanceField: "distance"
      }
    }
  ]);

  res.status(200).json({
    status: "Success",
    data: distances
  });
});
