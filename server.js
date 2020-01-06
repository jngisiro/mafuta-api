const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Saftety net handle unexpected programming errors
process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION!");
  console.log(err.name, err.stack);
  // process.exit(1);
});

if (process.env.NODE_ENV === "test")
  dotenv.config({ path: "./testing.config.env" });
else dotenv.config({ path: "./config.env" });
//const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => console.log("Successful Database Connection"));

const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(
    `Running in ${process.env.NODE_ENV} mode\nListening on port ${process.env.PORT}`
  );
});

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION!");
  console.log(err.name, err.message);
  // server.close(() => {
  //   process.exit(1);
  // });
});

module.exports = server;
