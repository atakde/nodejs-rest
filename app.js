const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Implement body parser
app.use(bodyParser.json());

// Cors
app.use(cors());

// Routes
const countriesRoute = require("./routes/countries");
const salesRepRoute = require("./routes/salesrep");
app.use("/countries", countriesRoute);
app.use("/salesRep", salesRepRoute);

// Handle not found
app.use((req, res, next) => {
  const error = new Error("Requested URL is not available!");
  error.status = 404;
  next(error);
});

// Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

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
