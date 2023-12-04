# Code Challenge: Cocktail and Beer Suggestion Service Documentation

## Introduction

The App is implemented using Node.js and Express, with data sourced from third-party APIs for cocktails and beers.

## Table of Contents

1. [Getting Started](#getting-started)
2. [API Endpoints](#api-endpoints)
   - Exercise 1
        - [Random Beer](#random-beer)
        - [Random Cocktail](#random-cocktail)
   - Exercise 2 (Task A)
        - [Suggested Drink](#suggested-drink)

## Getting Started

### Prerequisites

Before running the service, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   cd <repository-directory>
   npm install
   ```

3. Enviroment variables
    1. **Generate API Key:**
      - Visit the [API Ninjas website](https://api-ninjas.com/api).
      - Create an account if you don't have one.
      - After creating an account, navigate to [your profile](https://api-ninjas.com/profile).
      - Find your API key, which will be available on this page.

    2. **Create `.env` File:**
      - In the root directory of your project, create a file named `.env`.
      - Inside the `.env` file, add the API key in the format: `API_KEY=your_api_key_here`.


4. Start the service:

   ```bash
   npm start
   ```

## API Endpoints

### Random Beer

- **Endpoint:** `/beer`
- **Method:** `GET`
- **Description:** Returns details of a randomly selected beer.
- **Example Response:**

  ```json
  {
    "name": "Punk IPA",
    "tagline": "Post Modern Classic",
    "ABV": 5.6,
    "IBU": 41.5,
    "foodPairing": [
      "Fresh Crab with Lemon",
      "Garlic Butter Dipping Sauce",
      "Goats Cheese Salad",
      "Creamy Lemon Bar doused in powdered sugar."
    ]
  }
  ```

### Random Cocktail

- **Endpoint:** `/cocktail`
- **Method:** `GET`
- **Description:** Returns details of a randomly selected cocktail.
- **Example Response:**

  ```json
  {
    "name": "Mojito",
    "tagline": "Classic Elegance",
    "ingredients": [
      "1 1/2 oz Light rum",
      "2 tsp Sugar",
      "8 Fresh mint leaves",
      "1/2 Lime",
      "Soda water"
    ],
    "instructions": "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with ice. Pour the rum and top with soda water. Garnish and serve with straw."
  }
  ```

### Suggested Drink

- **Endpoint:** `/suggestion`
- **Method:** `GET`
- **Description:** Returns a suggested drink based on the user's local time. It suggests a random beer during the day and a cocktail starting with the first letter of the user's first name during the night.
- **Example Response:**

  ```json
  {
    "name": "Punk IPA",
    "tagline": "Post Modern Classic",
    "ABV": 5.6,
    "IBU": 41.5,
    "foodPairing": [
      "Fresh Crab with Lemon",
      "Garlic Butter Dipping Sauce",
      "Goats Cheese Salad",
      "Creamy Lemon Bar doused in powdered sugar."
    ]
  }
  ```
