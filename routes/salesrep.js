const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (request, response) => {
  try {
    let responseArr = [];
    const countriesData = await axios
      .get("http://127.0.0.1:3000/countries")
      .then(function (res) {
        return res.data;
      })
      .catch(function () {
        throw new Error("Error while getting country data.");
      });
    if (Object.keys(countriesData).length !== 0) {
      let regions = [];
      countriesData.forEach((element) => {
        // if not defined set 1
        if (!regions[element.region]) {
          regions[element.region] = 1;
        } else {
          regions[element.region]++;
        }
      });

      for (let key in regions) {
        responseArr.push({
          region: key,
          minSalesReq: regions[key] > 7 ? Math.round(regions[key] / 7) + 1 : 1,
          maxSalesReq: regions[key] > 3 ? Math.round(regions[key] / 3) : 1,
        });
      }
    } else {
      throw new Error("Empty country data.");
    }
    response.json(responseArr);
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
