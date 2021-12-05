const Country = require("../models/countryModel");

exports.getAllCountries = async (request, response, next) => {
  try {
    const region = request.query.region || "";
    const searchObj = {};
    if (region) {
      searchObj["region"] = region;
    }
    const countries = await Country.find(searchObj);
    response.json(countries);
  } catch (error) {
    next(error);
  }
};
