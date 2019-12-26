const catchAsync = require("../utils/catchAsync"); // Error Handling wrapper for aysnc operations
const AppError = require("../utils/app-error"); // Custom Error Handling Class
const User = require("../models/user.model");

const filterRequestBody = (inputData, ...allowedFields) => {
  const fields = {};
  Object.keys(inputData).forEach(el => {
    if (allowedFields.includes(el)) fields[el] = inputData[el];
  });
  return fields;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "Success",
    data: {
      users
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });
  res.status(200).json({
    status: "Success",
    message: "User created",
    user
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(new AppError(`No User found with ID: ${req.params.id}`, 404));

  res.status(200).json({
    status: "Success",
    user
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "Success",
    data: {
      user: "user"
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "Success",
    data: {
      user: "user"
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Prevent user from posting password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "Cannot update password from theis route. Use /updatePassword",
        400
      )
    );

  // filter unwanted data from the request object
  const filteredData = filterRequestBody(req.body, "firstname", "lastname");

  // Update User document
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { ...filteredData },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null
  });
});
