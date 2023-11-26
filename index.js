const express = require("express");
const app = express();
const PORT = 3000;

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

app.get("/beer", (req, res) => {
  const randomBeer = generateRandomBeer();
  res.json(randomBeer);
});

app.get("/cocktail", (req, res) => {
  const randomCocktail = generateRandomCocktail();
  res.json(randomCocktail);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
