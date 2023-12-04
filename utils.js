// utils.js
const apiKey = "koDgoe9bc4Ffgvh8rgzWWQ==PC7lyNMTmcFAFoVa";
const { DateTime } = require("luxon");
const axios = require("axios");

function isDaytime(time) {
  const hours = parseInt(time.split(":")[0]);
  const daytimeStart = 6;
  const daytimeEnd = 18;
  return hours >= daytimeStart && hours < daytimeEnd;
}

async function getRandomUser() {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const userData = response.data.results[0];
    const fullName = `${userData.name.first} ${userData.name.last}`;
    const city = userData.location.city;
    const country = userData.location.country;
    console.log(`Full name: ${fullName}, City: ${city}, Country: ${country}`);
    return {
      fullName: fullName,
      city: city,
    };
  } catch (error) {
    throw new Error(`Error fetching random user: ${error.message}`);
  }
}

async function getCityTimeZoneByName(city) {
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/timezone?city=${city}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );
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
  getIngredients,
  fetchCocktail,
};
