const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const preferencesRoutes = require("../src/routes/preferences");
const path = require("path");
const { getNews } = require("./helpers/fetchExternalData");
const newsRoutes = require("./routes/news");


const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3001;

routes.get("/", (req, res) => {
  //an API call will be made as soon as a req is encoutered from browser,
  //so as to cache news in the file. 
  getNews();
  res.status(200).send("Welcome to airtribe");
});

routes.use("/preferences", preferencesRoutes);
routes.use("/news", newsRoutes);

app.listen(PORT, (err) => {
  if (!err) {
    console.log("Server is successfully started");
  } else {
    console.log(err);
  }
});
