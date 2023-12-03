const express = require("express");
const app = express();
const PORT = 3000;
const axios = require("axios");

/**
 * Returns a random element from the given array.
 *
 * @param {Array} arr - The array from which to retrieve a random element.
 * @return {*} - A random element from the array.
 */
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a random beer.
 *
 * @return {Object} - An object representing a random beer with the following properties:
 *   - name: {string} - The name of the beer.
 *   - tagline: {string} - A tagline for the beer.
 *   - abv: {number} - The alcohol by volume (ABV) of the beer.
 *   - ibu: {number} - The International Bitterness Units (IBU) of the beer.
 *   - foodPairing: {Array} - An array of strings representing food pairings for the beer.
 */
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

/**
 * Generates a random cocktail with a name, tagline, list of ingredients, and instructions.
 *
 * @return {object} An object containing the random cocktail details.
 */

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
/**
 * Retrieves a random user from an external API.
 *
 * @return {Object} An object containing the full name of the user.
 */
const getRandomUser = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api/");

    const userData = response.data.results[0];
    const fullName = `${userData.name.first} ${userData.name.last}`;
    return {
      fullName,
    };
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching random user: ${error.message}`);
  }
};
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
  console.log(`Random user inside suggestion: ${user.fullName}`);
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
