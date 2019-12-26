const express = require("express");

const app = express();
const userRouter = require("./routes/user.routes");
const transactionRouter = require("./routes/transaction.routes");
const AppError = require("./utils/app-error");
const globalErrorHandler = require("./controllers/error.controller");

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

// TODO handle rate limit with express-rate-limit
// const limiter = rateLimit({ max: 100, windowMs: 60* 60 * 1000, message: "To many requests from this IP" })

// TODO install and configure cors()
app.use(allowCrossDomain); // app.use(cors()) // app.options("*", cors())

// Parse request data in the request body into json
app.use(express.json());

// User routes
app.use("/api/v1/users", userRouter);

// Transaction Routes
app.use("/api/v1/transactions", transactionRouter);

// TODO Station routes

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find route: ${req.originalUrl}`, 400));
});

// Error handling
app.use(globalErrorHandler);

module.exports = app;
