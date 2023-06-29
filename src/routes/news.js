const express = require("express");
const newsRoutes = express.Router();
const bodyParser = require("body-parser");
const { getNews,addToRead } = require("../controllers/news.js");

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

newsRoutes.get("/", getNews);
newsRoutes.post("/:id/read",addToRead);
// preferenceRoutes.put("/", updatePreference);

module.exports = newsRoutes;