require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const axios = require('axios');

app.use(cors());

class Forecast {
  constructor(eachWeatherDay) {
    this.date = eachWeatherDay.datetime;
    this.description = eachWeatherDay.weather.description;
  }
}

class Movie {
  constructor(eachMovie) {
    this.title = eachMovie.title;
    this.overview = eachMovie.overview;
    this.aveVotes = eachMovie.vote_average;
    this.totalVotes = eachMovie.vote_count;
    this.image = eachMovie.poster_path;
    this.popular = eachMovie.popularity;
    this.releaseDate = eachMovie.release_date;
  }
}

app.get('/movies', async (request, response) => {
  const searchQuery = request.query.searchQuery;

  const apiMovieUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`;

  try {
    const apiMovieResponse = await axios.get(apiMovieUrl);
    const movieDataArray = apiMovieResponse.data.results.map(eachMovie => new Movie(eachMovie));
    response.status(200).send(movieDataArray);
  } catch(error) {
    console.error('error fetching movies', error);
  }
});

app.get('/weather', async (request, response) => {

  const { lon, lat, searchQuery } = request.query;
  if (!lon || !lat || !searchQuery) {
    response.status(400).json({});
    return;
  }
  try {
    const apiWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lon=${lon}&lat=${lat}&searchQuery=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;

    const apiWeatherResponse = await axios.get(apiWeatherUrl);
    const forecastData = apiWeatherResponse.data.data;

    console.log(apiWeatherResponse.data, 'API Response');
    console.log('forcast data', forecastData);

    if (!forecastData || forecastData.lenth === 0) {
      response.status(404).json({ error: 'City not found or no weather data available' });
      return;
    }
    const formattedForecast = forecastData.map (eachWeatherDay => new Forecast(eachWeatherDay));
    console.log(formattedForecast);

    response.json({ city: forecastData[0].city_name, weatherData: formattedForecast });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
