const axios = require("axios");

exports.getSalesRepresentorCounts = async (request, response, next) => {
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
        let maxSalesReq = 1;
        let minSalesReq = 1;

        if (regions[key] > 3) {
          maxSalesReq =
            regions[key] % 3 !== 0
              ? parseInt(regions[key] / 3) + 1
              : regions[key] / 3;
        }

        if (regions[key] > 7) {
          minSalesReq =
            regions[key] % 7 !== 0
              ? parseInt(regions[key] / 7) + 1
              : regions[key] / 7;
        }

        responseArr.push({
          region: key,
          minSalesReq,
          maxSalesReq,
        });
      }
    } else {
      throw new Error("Empty country data.");
    }
    response.json(responseArr);
  } catch (error) {
    next(error);
  }
};
