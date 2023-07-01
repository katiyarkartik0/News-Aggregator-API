const newsData = require("../news.json") || [];
const usersData = require("../usersData.json");
const path = require("path");
const fs = require("fs");

const getNewsBasedOnPreference = (userId) => {
  let preferencesList = [];
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == userId) {
      preferencesList = usersData[i].preferences;
      break;
    }
  }
  const newsBasedOnPreference = newsData.filter((item) => {
    if (preferencesList.includes(item.category)) {
      return true;
    }
    return false;
  });
  return newsBasedOnPreference;
};

const getNews = (req, res) => {
  if (req.verified == false && req.msg != null) {
    return res.status(403).send(req.msg);
  }
  if (req.verified == false && req.msg == null) {
    return res.status(403).send("invalid JWT token");
  }

  const userId = req.id;
  const newsBasedOnPreference = getNewsBasedOnPreference(userId);
  return res.status(200).send(newsBasedOnPreference);
};

const addToRead = (req, res) => {
  if (req.verified == false && req.msg != null) {
    return res.status(403).send(req.msg);
  }
  if (req.verified == false && req.msg == null) {
    return res.status(403).send("invalid JWT token");
  }

  const userId = req.id
  const { id: newsId } = req.params;


  const newsBasedOnPreference = getNewsBasedOnPreference(userId);

  let readNews;
  let newsFound = false;
  for (let i = 0; i < newsBasedOnPreference.length; i++) {
    if (newsFound == true) {
      break;
    }
    for (let j = 0; j < newsBasedOnPreference[i].data.length; j++) {
      if (newsBasedOnPreference[i].data[j].uniqueId == newsId) {
        readNews = newsBasedOnPreference[i].data[j];
        newsFound = true;
        break;
      }
    }
  }
  if (!readNews) {
    return res
      .status(400)
      .send(
        "either news-ID is invalid or the ID provided is not of the news that is from your preference list of news categories !"
      );
  }
  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      return { ...user, read: [...user.read, readNews] };
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
  if (req.verified == false && req.msg != null) {
    return res.status(403).send(req.msg);
  }
  if (req.verified == false && req.msg == null) {
    return res.status(403).send("invalid JWT token");
  }
  const userId = req.id
  const { id: newsId } = req.params;

  const newsBasedOnPreference = getNewsBasedOnPreference(userId);

  let favoriteNews;
  let newsFound = false;
  for (let i = 0; i < newsBasedOnPreference.length; i++) {
    if (newsFound == true) {
      break;
    }
    for (let j = 0; j < newsBasedOnPreference[i].data.length; j++) {
      if (newsBasedOnPreference[i].data[j].uniqueId == newsId) {
        favoriteNews = newsBasedOnPreference[i].data[j];
        newsFound = true;
        break;
      }
    }
  }
  if (!favoriteNews) {
    return res
      .status(400)
      .send(
        "either news-ID is invalid or the ID provided is not of the news that is from your preference list of news categories !"
      );
  }
  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      return { ...user, favorites: [...user.favorites, favoriteNews] };
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
  if (req.verified == false && req.msg != null) {
    return res.status(403).send(req.msg);
  }
  if (req.verified == false && req.msg == null) {
    return res.status(403).send("invalid JWT token");
  }
  const userId = req.id;
  let readNews;
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == userId) {
      readNews = usersData[i].read;
      break;
    }
  }
  return res.status(200).send(readNews);
};

const getFavoriteNews = (req, res) => {
  if (req.verified == false && req.msg != null) {
    return res.status(403).send(req.msg);
  }
  if (req.verified == false && req.msg == null) {
    return res.status(403).send("invalid JWT token");
  }
  const userId = req.id;
  let favoriteNews;
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == userId) {
      favoriteNews = usersData[i].favorites;
      break;
    }
  }
  return res.status(200).send(favoriteNews);
};

module.exports = {
  getNews,
  addToRead,
  addToFavorites,
  getReadNews,
  getFavoriteNews,
};
