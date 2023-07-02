const path = require("path");
const fs = require("fs");

const {
  findNewsArticle,
  getReadOrFavoritesNews,
  getNewsListBasedOnPreference,
} = require("./helpers");
const usersData = require("../usersData.json");

const getNews = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const newsListBasedOnPreference = getNewsListBasedOnPreference(userId);
  return res.status(200).send(newsListBasedOnPreference);
};

const addToRead = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const { id: newsId } = req.params;

  const newsListBasedOnPreference = getNewsListBasedOnPreference(userId);
  const newsArticle = findNewsArticle(newsId, newsListBasedOnPreference);

  if (!newsArticle) {
    return res
      .status(400)
      .send(
        "either news-ID is invalid or the ID provided is not of the news that is from your preference list of news categories !"
      );
  }
  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      return { ...user, read: [...user.read, newsArticle] };
    }
    return user;
  });
  const writePath = path.join(__dirname, "..", "usersData.json");
  fs.writeFileSync(writePath, JSON.stringify(updatedUserData), {
    encoding: "utf-8",
    flag: "w",
  });
  return res.status(200).send("News Article added to read successfully!");
};

const addToFavorites = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const { id: newsId } = req.params;

  const newsListBasedOnPreference = getNewsListBasedOnPreference(userId);
  const newsArticle = findNewsArticle(newsId, newsListBasedOnPreference);

  if (!newsArticle) {
    return res
      .status(400)
      .send(
        "either news-ID is invalid or the ID provided is not of the news that is from your preference list of news categories !"
      );
  }
  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      return { ...user, favorites: [...user.favorites, newsArticle] };
    }
    return user;
  });
  const writePath = path.join(__dirname, "..", "usersData.json");
  fs.writeFileSync(writePath, JSON.stringify(updatedUserData), {
    encoding: "utf-8",
    flag: "w",
  });
  return res.status(200).send("News Article added to favorites successfully!");
};

const getReadNews = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const readNewsList = getReadOrFavoritesNews(userId, { key: "read" });
  return res.status(200).send(readNewsList);
};

const getFavoriteNews = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const userId = req.id;
  const favoritesNewsList = getReadOrFavoritesNews(userId, {
    key: "favorites",
  });
  return res.status(200).send(favoritesNewsList);
};

module.exports = {
  getNews,
  addToRead,
  addToFavorites,
  getReadNews,
  getFavoriteNews,
};
