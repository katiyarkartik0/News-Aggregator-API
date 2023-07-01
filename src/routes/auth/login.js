const express = require("express");
const loginRoutes = express.Router();
const bodyParser = require("body-parser");
const { loginUser } = require("../../controllers/auth/login");


loginRoutes.use(bodyParser.urlencoded({ extended: false }));
loginRoutes.use(bodyParser.json());

loginRoutes.post("/",loginUser);

module.exports = {loginRoutes};