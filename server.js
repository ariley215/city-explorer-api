require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { getMovies } = require('./handlers/movieHandler');
const { getWeather } = require('./handlers/weatherHandler');

app.use(cors());



app.get('/movies', async (request, response) => {
  const searchQuery = request.query.searchQuery;

  try {
    const movieDataArray = await getMovies(searchQuery);
    response.status(200).send(movieDataArray);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/weather', async (request, response) => {

  const { lon, lat, searchQuery } = request.query;
  if (!lon || !lat || !searchQuery) {
    response.status(400).json({});
    return;
  }
  try {
    const weatherData = await getWeather(lon, lat, searchQuery);
    response.json(weatherData);
  } catch (error) {
    response.status(error.status).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
