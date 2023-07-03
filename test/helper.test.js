const { getPreferencesListOfUser } = require("../src/controllers/helpers");
const expect = require("chai").expect;
const usersData = require("../src/usersData.json");

const preferences = (userId) =>
  usersData.filter((user) => {
    if (user.userId == userId) {
      return true;
    }
    return false;
  })[0].preferences;

describe("Get preference list of user by getPreferenceListOfUser() function", () => {
  it("should return preferences of user with userId 21", () => {
    expect(getPreferencesListOfUser("21")).to.have.members(preferences("21"));
  });
  it("should return preferences of user with userId 70b522e2-f963-48b3-8076-d8b40b75adbe", () => {
    expect(
      getPreferencesListOfUser("70b522e2-f963-48b3-8076-d8b40b75adbe")
    ).to.have.members(preferences("70b522e2-f963-48b3-8076-d8b40b75adbe"));
  });
});
