const express = require("express");
const {
  getPreference,
  updatePreference,
} = require("../controllers/preference.js");
const newsRoutes = express.Router();
const bodyParser = require("body-parser");

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

// preferenceRoutes.get("/", getPreference);
// preferenceRoutes.put("/", updatePreference);

module.exports = newsRoutes;