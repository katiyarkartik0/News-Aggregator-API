const newsData = require("../news.json") || [];
const usersData = require("../usersData.json");

const getPreferencesListOfUser = (userId) => {
  let preferencesList = [];
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == userId) {
      preferencesList = usersData[i].preferences;
      break;
    }
  }
  return preferencesList;
};

const getNewsListBasedOnPreference = (userId) => {
  let preferencesList = getPreferencesListOfUser(userId);
  const newsBasedOnPreference = newsData.filter((item) => {
    if (preferencesList.includes(item.category)) {
      return true;
    }
    return false;
  });
  return newsBasedOnPreference;
};

const findNewsArticle = (newsId, newsListBasedOnPreference) => {
  let newsArticle;
  let newsFound = false;
  for (let i = 0; i < newsListBasedOnPreference.length; i++) {
    if (newsFound == true) {
      break;
    }
    for (let j = 0; j < newsListBasedOnPreference[i].data.length; j++) {
      if (newsListBasedOnPreference[i].data[j].uniqueId == newsId) {
        newsArticle = newsListBasedOnPreference[i].data[j];
        newsFound = true;
        break;
      }
    }
  }
  return newsArticle;
};

const getReadOrFavoritesNews = (userId, type) => {
  const { key } = type;
  if (key != "read" && key != "favorites") {
    return [];
  }
  let newsList = [];
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == userId) {
      newsList = usersData[i][key];
      break;
    }
  }
  return newsList;
};

module.exports = {
  getPreferencesListOfUser,
  findNewsArticle,
  getNewsListBasedOnPreference,
  getReadOrFavoritesNews,
};
