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
  fetchCocktail,
} = require("./utils");
const BEER_API_URL = "https://api.punkapi.com/v2/beers";
const COCKTAIL_API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.get("/beer", async (req, res) => {
  try {
    const response = await axios.get(`${BEER_API_URL}/random`);
    const beerData = response.data[0];
    const beerInfo = {
      name: beerData.name,
      tagline: beerData.tagline,
      ABV: beerData.abv,
      IBU: beerData.ibu,
      foodPairing: beerData.food_pairing,
    };

    res.json(beerInfo);
  } catch (error) {
    console.error("Error fetching random beer:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cocktail", async (req, res) => {
  try {
    const cocktailInfo = await fetchCocktail(`${COCKTAIL_API_URL}/random.php`);
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

    // console.log(`Current time in ${user.city}:`, formattedTime);
    // console.log("user name", user.fullName[0][0]);

    const firstLetter = user.fullName[0][0];
    const isDay = isDaytime(formattedTime);
    let data = null;

    if (isDay) {
      const beerResponse = await axios.get(`${BEER_API_URL}/random`);
      data = beerResponse.data;
    } else {
      data = await fetchCocktail(
        `${COCKTAIL_API_URL}/search.php?f=${firstLetter}`
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
