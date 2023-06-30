const preferencesConstrains = require("./constants");

class Validator {
  constructor() {}
  filterOutValidPreferences(incomingPreferences) {
    if (typeof incomingPreferences != "object") {
      return {
        error: true,
        msg: `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`,
      };
    }
    const filteredPrefenceList = incomingPreferences.filter((preference) => {
      if (preferencesConstrains.includes(preference) == true) {
        return true;
      }
      return false;
    });
    if (filteredPrefenceList.length == 0) {
      return {
        error: true,
        msg: `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`,
      };
    } else {
      if (incomingPreferences.length == filteredPrefenceList.length) {
        return {
          error: false,
          msg: "preferences has been updated successfully",
          filteredPrefenceList,
        };
      } else {
        return {
          error: false,
          msg: `valid preferences has been filtered out of incoming preference list chosing from ${preferencesConstrains}`,
          filteredPrefenceList,
        };
      }
    }
  }
}

module.exports = { Validator };
