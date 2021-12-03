const express = require("express");
const router = express.Router();
const Country = require("../models/Country");

router.get("/", async (request, response) => {
  try {
    const region = request.query.region || "";
    const searchObj = {};
    if (region) {
      searchObj["region"] = region;
    }
    const countries = await Country.find(searchObj);
    response.json(countries);
  } catch (err) {
    response.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message || "Internal Server Error.",
      },
    });
  }
});

module.exports = router;
