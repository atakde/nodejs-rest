const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const PORT = 3000;
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const errorController = require("./controllers/errorController");
require("dotenv").config();

// Cors
app.use(cors());

// Security headers
app.use(helmet());

//  apply to all requests rate limitter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this ip, try again later.",
  })
);

// Implement body parser
app.use(bodyParser.json());

// Mongo sanitize
app.use(mongoSanitize());

// Routes
const countriesRoute = require("./routes/countryRoutes");
const salesRepRoute = require("./routes/representorRoutes");
app.use("/countries", countriesRoute);
app.use("/salesrep", salesRepRoute);

// Handle not defined routes
app.use("*", (req, res, next) => {
  const error = new Error("Requested URL is not available!");
  error.status = 404;
  next(error);
});

// Error Handler
app.use(errorController);

// Connect DB
mongoose.connect(process.env.CONNECTION_STRING, () => {
  console.log("Connected to mongo.");
});

mongoose.connection.on("connected", () => {
  console.log("Connection open.");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected.");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

// Listen server
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
