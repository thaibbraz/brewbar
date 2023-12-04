const apiKey = process.env.API_KEY;
const { DateTime } = require("luxon");
const axios = require("axios");

const USER_API_URL = "https://randomuser.me/api/";
const TIMEZONE_API_URL = "https://api.api-ninjas.com/v1/timezone";

function isDaytime(time) {
  const hours = parseInt(time.split(":")[0]);
  const daytimeStart = 6;
  const daytimeEnd = 18;
  return hours >= daytimeStart && hours < daytimeEnd;
}

async function getRandomUser() {
  try {
    const response = await axios.get(USER_API_URL);
    const userData = response.data.results[0];
    const fullName = `${userData.name.first} ${userData.name.last}`;
    const city = userData.location.city;
    const country = userData.location.country;

    return {
      fullName: fullName,
      city: city,
      country: country,
    };
  } catch (error) {
    throw new Error(`Error fetching random user: ${error.message}`);
  }
}

async function getCityTimeZoneByName(city) {
  try {
    const response = await axios.get(`${TIMEZONE_API_URL}?city=${city}`, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting city time:", error.message);
    throw new Error("Unable to get the city time.");
  }
}

function getCurrentTimeInTimeZone(timeZone) {
  try {
    const currentTime = DateTime.now().setZone(timeZone);
    return currentTime;
  } catch (error) {
    console.error("Error getting current time:", error.message);
    throw new Error("Unable to get the current time.");
  }
}

function getIngredients(cocktailData) {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktailData[`strIngredient${i}`];
    const measure = cocktailData[`strMeasure${i}`];

    if (ingredient && measure) {
      ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
    } else if (ingredient) {
      ingredients.push(ingredient.trim());
    }
  }

  return ingredients;
}

async function fetchBeer(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    const beerData = response.data[0];
    const beerInfo = {
      name: beerData.name,
      tagline: beerData.tagline,
      ABV: beerData.abv,
      IBU: beerData.ibu,
      foodPairing: beerData.food_pairing,
    };

    return beerInfo;
  } catch (error) {
    console.error("Error fetching random beer:", error.message);
    throw new Error("Internal server error");
  }
}

async function fetchCocktail(apiUrl) {
  try {
    const response = await axios.get(apiUrl);

    const cocktailData = response.data.drinks[0];
    const cocktailInfo = {
      name: cocktailData.strDrink,
      tagline: cocktailData.strTags,
      ingredients: getIngredients(cocktailData),
      instructions: cocktailData.strInstructions,
    };

    return cocktailInfo;
  } catch (error) {
    console.error("Error fetching random cocktail:", error.message);
    throw new Error("Internal server error");
  }
}

module.exports = {
  isDaytime,
  getRandomUser,
  getCityTimeZoneByName,
  getCurrentTimeInTimeZone,
  fetchBeer,
  fetchCocktail,
};
