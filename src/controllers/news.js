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
  const { userId } = req.body;
  const newsBasedOnPreference = getNewsBasedOnPreference(userId);
  return res.status(200).send(newsBasedOnPreference);
};

const addToRead = (req, res) => {
  const { userId } = req.body;
  const id = req.params.id;

  const newsBasedOnPreference = getNewsBasedOnPreference(userId);

  let readNews;
  let newsFound = false;
  for (let i = 0; i < newsBasedOnPreference.length; i++) {
    if (newsFound == true) {
      break;
    }
    for (let j = 0; j < newsBasedOnPreference[i].data.length; j++) {
      if (newsBasedOnPreference[i].data[j].uniqueId == id) {
        readNews = newsBasedOnPreference[i].data[j];
        newsFound = true;
        break;
      }
    }
  }
  if (!readNews) {
    return res.status(400).send("Invalid news-ID!");
  }
  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      return { ...user, read:[...user.read,readNews] };
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

module.exports = { getNews, addToRead };
