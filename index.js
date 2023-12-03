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
} = require("./utils");
const { DateTime } = require("luxon"); // Import the DateTime class
const apiKey = "koDgoe9bc4Ffgvh8rgzWWQ==PC7lyNMTmcFAFoVa";
// /**
//  * Returns a random element from the given array.
//  *
//  * @param {Array} arr - The array from which to retrieve a random element.
//  * @return {*} - A random element from the array.
//  */
// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// /**
//  * Generates a random beer.
//  *
//  * @return {Object} - An object representing a random beer with the following properties:
//  *   - name: {string} - The name of the beer.
//  *   - tagline: {string} - A tagline for the beer.
//  *   - abv: {number} - The alcohol by volume (ABV) of the beer.
//  *   - ibu: {number} - The International Bitterness Units (IBU) of the beer.
//  *   - foodPairing: {Array} - An array of strings representing food pairings for the beer.
//  */
// function generateRandomBeer() {
//   const beerNames = [
//     "Hoppy Ale",
//     "Golden Lager",
//     "Stout Delight",
//     "Amber Ale",
//     "Wheat Bliss",
//   ];
//   const taglines = [
//     "Brewed to Perfection",
//     "Crafted with Love",
//     "A Taste of Tradition",
//     "Bold and Balanced",
//   ];
//   const foodPairings = [
//     "Spicy Tacos",
//     "Cheese Platter",
//     "Grilled Salmon",
//     "Chocolate Cake",
//   ];

//   return {
//     name: getRandomElement(beerNames),
//     tagline: getRandomElement(taglines),
//     abv: parseFloat((Math.random() * (10 - 4) + 4).toFixed(1)),
//     ibu: Math.floor(Math.random() * (100 - 10 + 1) + 10),
//     foodPairing: [
//       getRandomElement(foodPairings),
//       getRandomElement(foodPairings),
//       getRandomElement(foodPairings),
//     ],
//   };
// }

// /**
//  * Generates a random cocktail with a name, tagline, list of ingredients, and instructions.
//  *
//  * @return {object} An object containing the random cocktail details.
//  */

// function isDaytime(time) {
//   // Parse the time string to extract hours
//   const hours = parseInt(time.split(":")[0]);

//   // Define your custom range for daytime (adjust as needed)
//   const daytimeStart = 6; // 6 AM
//   const daytimeEnd = 18; // 6 PM

//   // Check if the hours fall within the daytime range
//   return hours >= daytimeStart && hours < daytimeEnd;
// }

// // Example usage
// const currentTimeString = "14:30"; // Replace with the actual time in 'HH:mm' format

// const isDay = isDaytime(currentTimeString);
// console.log(`Is it daytime? ${isDay}`);

// function generateRandomCocktail() {
//   const cocktailNames = [
//     "Mojito",
//     "Cosmopolitan",
//     "Old Fashioned",
//     "Martini",
//     "Pina Colada",
//   ];
//   const taglines = [
//     "Classic Elegance",
//     "Tropical Delight",
//     "Timeless Flavor",
//     "The Perfect Mix",
//   ];
//   const ingredients = [
//     "Vodka",
//     "Gin",
//     "Rum",
//     "Tequila",
//     "Triple Sec",
//     "Lime Juice",
//     "Simple Syrup",
//   ];
//   const instructions =
//     "Mix all ingredients in a shaker with ice and strain into a glass.";

//   return {
//     name: getRandomElement(cocktailNames),
//     tagline: getRandomElement(taglines),
//     ingredients: [
//       getRandomElement(ingredients),
//       getRandomElement(ingredients),
//       getRandomElement(ingredients),
//     ],
//     instructions: instructions,
//   };
// }
// /**
//  * Retrieves a random user from an external API.
//  *
//  * @return {Object} An object containing the full name of the user.
//  */
// const getRandomUser = async () => {
//   try {
//     const response = await axios.get("https://randomuser.me/api/");

//     const userData = response.data.results[0];
//     const fullName = `${userData.name.first} ${userData.name.last}`;
//     const city = userData.location.city;
//     const country = userData.location.country;
//     console.log(`Full name: ${fullName}, City: ${city}, Country: ${country}`);
//     return {
//       fullName: fullName,
//       city: city,
//     };
//   } catch (error) {
//     // Handle errors
//     throw new Error(`Error fetching random user: ${error.message}`);
//   }
// };
// const getCityTimeZoneByName = async (city) => {
//   try {
//     const response = await axios.get(
//       `https://api.api-ninjas.com/v1/timezone?city=${city}`,
//       {
//         headers: {
//           "X-Api-Key": apiKey,
//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     // Handle errors
//     console.error("Error getting city time:", error.message);
//     throw new Error("Unable to get the city time.");
//   }
// };

app.get("/beer", (req, res) => {
  const randomBeer = generateRandomBeer();
  res.json(randomBeer);
});

app.get("/cocktail", (req, res) => {
  const randomCocktail = generateRandomCocktail();
  res.json(randomCocktail);
});
// function getCurrentTimeInTimeZone(timeZone) {
//   try {
//     // Get the current time in the specified time zone
//     const currentTime = DateTime.now().setZone(timeZone);
//     return currentTime;
//   } catch (error) {
//     // Handle errors
//     console.error("Error getting current time:", error.message);
//     throw new Error("Unable to get the current time.");
//   }
// }

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
  // axios
  //   .get(`https://api.api-ninjas.com/v1/timezone?city=${user.city}`, {
  //     headers: {
  //       "X-Api-Key": apiKey,
  //     },
  //   })
  //   .then((response) => {
  //     if (response.status === 200) {
  //       // console.log(response.data);
  //       let currentTime = getCurrentTimeInTimeZone(response.data.timezone);
  //       console.log("Current time in London:", currentTime);
  //     } else {
  //       console.error(`Error: ${response.status}`, response.data);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Request failed:", error.message);
  //   });
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
