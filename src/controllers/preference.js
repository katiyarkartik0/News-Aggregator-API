const usersData = require("../usersData.json");
const path = require("path");
const fs = require("fs");
const { Validator } = require("../helpers/validator");

const getPreference = (req, res) => {
  const { userId } = req.body;
  let preferencesList;
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == userId) {
      preferencesList = usersData[i].preferences;
      break;
    }
  }
  res.status(200).send(preferencesList);
};

const updatePreference = (req, res) => {
  const { userId, preferences: incomingPreferences } = req.body;
  const validator = new Validator();
  const filteredPrefence =
    validator.filterOutValidPreferences(incomingPreferences);

  const { error, msg, filteredPrefenceList } = filteredPrefence;

  if (error) {
    return res.status(400).send(msg);
  }

  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      const updatedUserData = { ...user, preferences: filteredPrefenceList };
      return updatedUserData;
    }
    return user;
  });
  const writePath = path.join(__dirname, "..", "usersData.json");
  fs.writeFileSync(writePath, JSON.stringify(updatedUserData), {
    encoding: "utf-8",
    flag: "w",
  });

  res.status(200).send(msg);
};

module.exports = { getPreference, updatePreference };
