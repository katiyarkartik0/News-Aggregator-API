const usersData = require("../usersData.json");
const path = require("path");
const fs = require("fs");

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
  const { userId, preferences:incomingPreferences } = req.body;
  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      const updatedUserData = { ...user, preferences: incomingPreferences };
      return updatedUserData;
    }
    return user;
  });
  const writePath = path.join(__dirname, "..", "usersData.json");
  fs.writeFileSync(writePath, JSON.stringify(updatedUserData), {
    encoding: "utf-8",
    flag: "w",
  });
  res.status(200).send("preferences has been updated successfully");
};

module.exports = { getPreference, updatePreference };
