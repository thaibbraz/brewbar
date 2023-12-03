const express = require("express");
const app = express();
const PORT = 3000;

const {
  getRandomElement,
  generateRandomBeer,
  isDaytime,
  generateRandomCocktail,
  getRandomUser,
  getCityTimeZoneByName,
  getCurrentTimeInTimeZone,
} = require("./utils");

app.get("/beer", (req, res) => {
  const randomBeer = generateRandomBeer();
  res.json(randomBeer);
});

app.get("/cocktail", (req, res) => {
  const randomCocktail = generateRandomCocktail();
  res.json(randomCocktail);
});

app.get("/suggestion", async (req, res) => {
  const user = await getRandomUser();
  const response = await getCityTimeZoneByName(user.city);

  if (response.status === 200) {
    let currentTime = getCurrentTimeInTimeZone(response.data.timezone);
    currentTime = currentTime.toFormat("HH:mm");
    console.log(`Current time in ${user.city}:`, currentTime);
  } else {
    console.error(`Error: ${response.status}`, response.data);
  }

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
