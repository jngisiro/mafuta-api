const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/app-error");
const Attendant = require("../models/attendant.model");

exports.getAllAttendants = catchAsync(async (req, res, next) => {
  const attendant = await Attendant.find();
  res.status(200).json({
    status: "Success",
    data: {
      attendant
    }
  });
});

exports.createAttendant = catchAsync(async (req, res, next) => {
  const attendant = await Attendant.create(req.body);
  res.status(200).json({
    status: "Success",
    message: "Attendant created",
    attendant
  });
});

exports.getAttendant = catchAsync(async (req, res, next) => {
  const attendant = await Attendant.findById(req.params.id);
  if (!attendant)
    return next(
      new AppError(`No Attendant found with ID: ${req.params.id}`, 404)
    );
  res.status(200).json({
    status: "Success",
    attendant
  });
});

exports.updateAttendant = catchAsync(async (req, res, next) => {
  const attendant = await Attendant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!attendant)
    return next(
      new AppError(`No Attendant found with ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: "Success",
    data: {
      attendant
    }
  });
});

exports.deleteAttendant = catchAsync(async (req, res, next) => {
  const attendant = await Attendant.findByIdAndDelete(req.params.id);

  if (!attendant)
    return next(new AppError(`No User found with ID: ${req.params.id}`, 404));

  res.status(200).json({
    status: "Success",
    data: null
  });
});
