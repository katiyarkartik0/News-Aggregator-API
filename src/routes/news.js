const express = require("express");
const newsRoutes = express.Router();
const bodyParser = require("body-parser");
const {
  getNews,
  addToRead,
  addToFavorites,
  getFavoriteNews,
  getReadNews,
} = require("../controllers/news.js");
const { verifyToken } = require("../middleware/verifyToken.js");

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

newsRoutes.get("/", verifyToken, getNews);
newsRoutes.post("/:id/read", verifyToken, addToRead);
newsRoutes.post("/:id/favorite", verifyToken, addToFavorites);
newsRoutes.get("/read", verifyToken, getReadNews);
newsRoutes.get("/favorites", verifyToken, getFavoriteNews);

module.exports = newsRoutes;
