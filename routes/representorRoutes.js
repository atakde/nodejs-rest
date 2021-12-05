const express = require("express");
const router = express.Router();
const representorController = require("../controllers/representorController");

router.get("/", representorController.getSalesRepresentorCounts);

module.exports = router;
