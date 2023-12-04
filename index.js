const express = require("express");
const dotenv = require("dotenv");
const result = dotenv.config();
const app = express();
const PORT = 3000;
const axios = require("axios");

const {
  isDaytime,
  getRandomUser,
  getCityTimeZoneByName,
  getCurrentTimeInTimeZone,
  fetchBeer,
  fetchCocktail,
} = require("./utils");

const BEER_API_URL = "https://api.punkapi.com/v2/beers";
const COCKTAIL_API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

if (result.error) {
  console.error("Error loading .env file:", result.error);
  process.exit(1);
}

app.get("/beer", async (req, res) => {
  try {
    const beerInfo = await fetchBeer(`${BEER_API_URL}/random`);
    console.log("\x1b[33m%s\x1b[0m", `Beer name: ${beerInfo.name} 🍺`);
    res.json(beerInfo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cocktail", async (req, res) => {
  try {
    const cocktailInfo = await fetchCocktail(`${COCKTAIL_API_URL}/random.php`);
    console.log("\x1b[31m%s\x1b[0m", `Cocktail name: ${cocktailInfo.name} 🍸`);
    res.json(cocktailInfo);
  } catch (error) {
    console.error("Error fetching random cocktail:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/suggestion", async (req, res) => {
  try {
    const user = await getRandomUser();
    const response = await getCityTimeZoneByName(user.city);

    if (response.status !== 200) {
      console.error(`Error: ${response.status}`, response.data);
      return res.status(500).json({ error: "Internal server error" });
    }
    const currentTime = getCurrentTimeInTimeZone(response.data.timezone);
    const formattedTime = currentTime.toFormat("HH:mm");
    console.log(
      "\x1b[34m%s\x1b[0m",
      ` 🎲 Suggested 🎲 || Name: ${user.fullName}, City: ${user.city}, Country: ${user.country}, Local time: ${formattedTime} `
    );

    const firstLetter = user.fullName[0][0];
    const isDay = isDaytime(formattedTime);
    let data = null;

    if (isDay) {
      const beerResponse = await axios.get(`${BEER_API_URL}/random`);
      data = beerResponse.data;
      console.log("\x1b[33m%s\x1b[0m", `Got a random beer: ${data[0].name} 🍺`);
    } else {
      data = await fetchCocktail(
        `${COCKTAIL_API_URL}/search.php?f=${firstLetter}`
      );
      console.log(
        "\x1b[31m%s\x1b[0m",
        `Got a random cocktail: ${data.name} 🍸`
      );
    }

    res.json(data);
  } catch (error) {
    console.error("Error in /suggestion:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
