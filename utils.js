// utils.js
const apiKey = "koDgoe9bc4Ffgvh8rgzWWQ==PC7lyNMTmcFAFoVa";
const { DateTime } = require("luxon");
const axios = require("axios");

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomBeer() {
  const beerNames = [
    "Hoppy Ale",
    "Golden Lager",
    "Stout Delight",
    "Amber Ale",
    "Wheat Bliss",
  ];
  const taglines = [
    "Brewed to Perfection",
    "Crafted with Love",
    "A Taste of Tradition",
    "Bold and Balanced",
  ];
  const foodPairings = [
    "Spicy Tacos",
    "Cheese Platter",
    "Grilled Salmon",
    "Chocolate Cake",
  ];

  return {
    name: getRandomElement(beerNames),
    tagline: getRandomElement(taglines),
    abv: parseFloat((Math.random() * (10 - 4) + 4).toFixed(1)),
    ibu: Math.floor(Math.random() * (100 - 10 + 1) + 10),
    foodPairing: [
      getRandomElement(foodPairings),
      getRandomElement(foodPairings),
      getRandomElement(foodPairings),
    ],
  };
}

function isDaytime(time) {
  const hours = parseInt(time.split(":")[0]);
  const daytimeStart = 6;
  const daytimeEnd = 18;
  return hours >= daytimeStart && hours < daytimeEnd;
}

function generateRandomCocktail() {
  const cocktailNames = [
    "Mojito",
    "Cosmopolitan",
    "Old Fashioned",
    "Martini",
    "Pina Colada",
  ];
  const taglines = [
    "Classic Elegance",
    "Tropical Delight",
    "Timeless Flavor",
    "The Perfect Mix",
  ];
  const ingredients = [
    "Vodka",
    "Gin",
    "Rum",
    "Tequila",
    "Triple Sec",
    "Lime Juice",
    "Simple Syrup",
  ];
  const instructions =
    "Mix all ingredients in a shaker with ice and strain into a glass.";

  return {
    name: getRandomElement(cocktailNames),
    tagline: getRandomElement(taglines),
    ingredients: [
      getRandomElement(ingredients),
      getRandomElement(ingredients),
      getRandomElement(ingredients),
    ],
    instructions: instructions,
  };
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

module.exports = {
  getRandomElement,
  generateRandomBeer,
  isDaytime,
  generateRandomCocktail,
  getRandomUser,
  getCityTimeZoneByName,
  getCurrentTimeInTimeZone,
  getIngredients,
};
