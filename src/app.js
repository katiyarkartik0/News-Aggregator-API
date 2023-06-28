const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const preferencesRoutes = require("../src/routes/preferences");
const path = require("path");

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3001;

routes.get("/", (req, res) => {
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
