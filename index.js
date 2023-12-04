const express = require("express");
const app = express();
const PORT = 3000;
const axios = require("axios");
const {
  isDaytime,
  getRandomUser,
  getCityTimeZoneByName,
  getCurrentTimeInTimeZone,
  getIngredients,
  fetchCocktail,
} = require("./utils");

app.get("/beer", async (req, res) => {
  try {
    const response = await axios.get("https://api.punkapi.com/v2/beers/random");
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
    const cocktailInfo = await fetchCocktail(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
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
    console.log("user name", user.fullName[0][0]);
    let userName = user.fullName[0][0];
    let isDay = isDaytime(currentTime);
    let data;
    if (isDay) {
      const beerResponse = await axios.get("http://localhost:3000/beer");
      data = beerResponse.data;
    } else {
      data = await fetchCocktail(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${userName}`
      );
    }
    res.json(data);
  } else {
    console.error(`Error: ${response.status}`, response.data);
  }
});
// app.get("/suggestion", async (req, res) => {
//   try {
//     const user = await getRandomUser();
//     const response = await getCityTimeZoneByName(user.city);

//     if (response.status !== 200) {
//       console.error(`Error: ${response.status}`, response.data);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     const currentTime = getCurrentTimeInTimeZone(
//       response.data.timezone
//     ).toFormat("HH:mm");
//     // console.log(`Current time in ${user.city}:`, currentTime);
//     // console.log("user name", user.fullName[0][0]);
//     const isDay = isDaytime(currentTime);

//     let [beerData, cocktailData] = await Promise.all([
//       isDay ? axios.get("http://localhost:3000/beer") : null,
//       !isDay
//         ? fetchCocktail(
//             "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
//           )
//         : null,
//     ]);

//     // Handle null values in case one of the requests was skipped
//     beerData = beerData ? beerData.data : null;
//     cocktailData = cocktailData ? cocktailData : null;

//     res.json({ beerData, cocktailData });
//   } catch (error) {
//     console.error("Error in /suggestion:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
