const uuid = require("uuid");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { Validator } = require("../../helpers/validator");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: path.join(__dirname, "..", "..", "..", ".env"),
});

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const validator = new Validator();
  //second argument takes a boolean indicating that is use logging in or registering
  //loggin in- true
  //registering- false
  const { userData, msg } = validator.getUser(username, true);
  if (!userData) {
    return res.status(400).send({ accessToken: null, msg });
  }
  const isPasswordValid = bcrypt.compareSync(password.toString(), userData.password.toString());
  if (!isPasswordValid) {
    return res.status(400).send({ accessToken:null, msg: "invalid password" });
  }
  const token = jwt.sign({ id: userData.userId }, process.env.API_SECRET, {
    expiresIn: 86400,
  });
  return res
    .status(200)
    .send({ userData, msg: "login successful", accessToken: token });
};

module.exports = { loginUser };
