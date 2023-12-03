const express = require("express");
const app = express();
const PORT = 3000;
const axios = require("axios");
const {
  getRandomElement,
  generateRandomBeer,
  isDaytime,
  generateRandomCocktail,
  getRandomUser,
  getCityTimeZoneByName,
  getCurrentTimeInTimeZone,
  getIngredients,
} = require("./utils");

app.get("/beer", (req, res) => {
  const randomBeer = generateRandomBeer();
  res.json(randomBeer);
});

// app.get("/cocktail", async (req, res) => {
//   // const randomCocktail = generateRandomCocktail();
//   const randomCocktail = await axios.get(
//     "https://www.thecocktaildb.com/api/json/v1/1/random.php"
//   );
//   res.json(randomCocktail.data);
// });
app.get("/cocktail", async (req, res) => {
  try {
    // Make a request to TheCocktailDB API to get a random cocktail
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    // Extract relevant information from the response
    const cocktailData = response.data.drinks[0];
    const cocktailInfo = {
      name: cocktailData.strDrink,
      tagline: cocktailData.strTags,
      ingredients: getIngredients(cocktailData),
      instructions: cocktailData.strInstructions,
    };
    res.json(cocktailInfo);
  } catch (error) {
    console.error("Error fetching random cocktail:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/suggestion", async (req, res) => {
  const user = await getRandomUser();
  const response = await getCityTimeZoneByName(user.city);

  if (response.status === 200) {
    let currentTime = getCurrentTimeInTimeZone(response.data.timezone);
    currentTime = currentTime.toFormat("HH:mm");
    console.log(`Current time in ${user.city}:`, currentTime);
    let isDay = isDaytime(currentTime);
    let data;
    if (isDay) {
      const beerResponse = await axios.get("http://localhost:3000/beer");
      data = beerResponse.data;
    } else {
      data = generateRandomCocktail();
    }
    res.json(data);
  } else {
    console.error(`Error: ${response.status}`, response.data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
