const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema({
  name: {
    type: String,
  },
  region: {
    type: String,
  },
});

module.exports = mongoose.model("Countries", CountrySchema);
