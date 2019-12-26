const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/app-error");
const Station = require("../models/station.model");

exports.getAllStations = catchAsync(async (req, res, next) => {
  const station = await Station.find();
  res.status(200).json({
    status: "Success",
    data: {
      station
    }
  });
});

exports.createStation = catchAsync(async (req, res, next) => {
  const station = await Station.create(req.body);
  res.status(200).json({
    status: "Success",
    message: "Station created",
    station
  });
});

exports.getStation = catchAsync(async (req, res, next) => {
  const station = await Station.findById(req.params.id);
  if (!station)
    return next(
      new AppError(`No Station found with ID: ${req.params.id}`, 404)
    );
  res.status(200).json({
    status: "Success",
    station
  });
});

exports.updateStation = catchAsync(async (req, res, next) => {
  const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!station)
    return next(
      new AppError(`No Station found with ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: "Success",
    data: {
      station
    }
  });
});

exports.deleteStation = catchAsync(async (req, res, next) => {
  const station = await Station.findByIdAndDelete(req.params.id);

  if (!station)
    return next(
      new AppError(`No Station found with ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: "Success",
    data: null
  });
});
