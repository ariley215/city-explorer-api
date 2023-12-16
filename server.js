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

app.get('/weather', async (request, response) => {

  const { lat, lon, searchQuery } = request.query;
  if (!lat || !lon || !searchQuery) {
    response.status(400).json({});
    return;
  }
  try {
    const apiWeatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&searchQuery=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;

    const apiWeatherResponse = await axios.get(apiWeatherUrl);
    const foundCity = apiWeatherResponse.data.data[0];

    console.log(apiWeatherResponse.data, 'API Response');
    console.log('Found City', foundCity);

    if (!foundCity) {
      response.status(404).json({ error: 'City not found.' });
      return;
    }
    const formattedForecast = new Forecast(foundCity);
    console.log(formattedForecast);

    response.json({ city: foundCity.city_name, weatherData: [formattedForecast] });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
