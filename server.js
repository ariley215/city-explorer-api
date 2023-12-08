require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json');
const app = express();
const PORT = process.env.PORT || 3000;

class Forecast {
  constructor(eachWeatherDay) {
    this.date = eachWeatherDay.datetime;
    this.description = eachWeatherDay.weather.description;
  }
}

app.get('/weather', (request, response) => {

  const { lat, lon, searchQuery } = request.query;
  if (!lat || !lon || !searchQuery) {
    response.status(400).json({});
  }

  const foundCity = weatherData.find((cityData) => {
    return cityData.city_name === searchQuery;
  });
  console.log(foundCity);
  const formattedForecast = foundCity.data.map((weatherDayData) => {
    return new Forecast(weatherDayData);
  });
  console.log(formattedForecast);

  if (formattedForecast) {
    response.json({ city: foundCity.city_name, weatherData: formattedForecast });
  } else {
    response.status(404).json({ error: 'City not found.' });
  }

});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
