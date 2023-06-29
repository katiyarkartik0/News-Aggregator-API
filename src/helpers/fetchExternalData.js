// const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

function generateUniqueCode(inputString) {
  // Generate a hash code based on the input string
  let hash = 0;
  if (inputString.length > 0) {
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
  }

  const uniqueCode = `${hash.toString(36)}`;

  return uniqueCode;
}

const getNewsByCategory = async (category) => {
  let newsList = [];
  try {
    const news = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=a86016d2a0b0497d81da6207e991340a`,
      {
        method: "GET",
      }
    );
    const resp = await news.json();
    const articles = resp.articles;
    newsList = articles.map((article) => {
      const { title } = article;
      return { ...article, uniqueId: generateUniqueCode(title) };
    });
  } catch (err) {
    console.log(err);
  }

  return newsList;
};

const getNews = async (req, res) => {
  const entertainmentNews = await getNewsByCategory("health");
  const businessNews = await getNewsByCategory("business");
  const healthNews = await getNewsByCategory("entertainment");

  const updatedNewsJSON = [
    { category: "health", data: healthNews },
    { category: "business", data: businessNews },
    { category: "entertainment", data: entertainmentNews },
  ];
  const writePath = path.join(__dirname, "..", "news.json");
  fs.writeFileSync(writePath, JSON.stringify(updatedNewsJSON), {
    encoding: "utf-8",
    flag: "w",
  });
};

module.exports = { getNews };
