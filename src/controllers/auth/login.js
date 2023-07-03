const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: path.join(__dirname, "..", "..", "..", ".env"),
});

const { Validator } = require("../../helpers/validator");
const { fetchNews } = require("../../helpers/fetchExternalData");

const logInUser = (req, res) => {
  const { username, password } = req.body;
  const validator = new Validator();
  //second argument takes a boolean indicating that is use logging in or registering
  //loggin in- true
  //registering- false
  const { userData, msg } = validator.getUser(username, { attempt: "logIn" });
  if (!userData) {
    return res.status(400).send({ accessToken: null, msg });
  }
  const isPasswordValid = bcrypt.compareSync(
    password.toString(),
    userData.password.toString()
  );
  if (!isPasswordValid) {
    return res.status(400).send({ accessToken: null, msg: "invalid password" });
  }
  const token = jwt.sign({ id: userData.userId }, process.env.API_SECRET, {
    expiresIn: 86400,
  });
  //an API call will be made as soon as user loggs in successfully ,so as to cache news in the file asynchronously.
  fetchNews(userData.userId)
    .then(() => {
      return res
        .status(200)
        .send({ userData, msg: "login successful", accessToken: token });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

module.exports = { logInUser };
