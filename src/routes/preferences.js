const express = require("express");
const {
  getPreference,
  updatePreference,
} = require("../controllers/preference.js");
const preferenceRoutes = express.Router();
const bodyParser = require("body-parser");
const { verifyToken } = require("../middleware/verifyToken.js");

preferenceRoutes.use(bodyParser.urlencoded({ extended: false }));
preferenceRoutes.use(bodyParser.json());

preferenceRoutes.get("/",verifyToken,getPreference);
preferenceRoutes.put("/",verifyToken ,updatePreference);

module.exports = preferenceRoutes;
