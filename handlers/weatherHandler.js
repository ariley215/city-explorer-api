
const axios = require('axios');
const Forecast = require('./models/Forecast');

async function getWeather(lon, lat, searchQuery) {

  const apiWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lon=${lon}&lat=${lat}&searchQuery=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;

  try {
    const apiWeatherResponse = await axios.get(apiWeatherUrl);
    const forecastData = apiWeatherResponse.data.data;

    console.log(apiWeatherResponse.data, 'API Response');
    console.log('forcast data', forecastData);

    if (!forecastData || forecastData.length === 0) {
      throw { status: 404, message: 'City not found or no weather data available' };

    }
    const formattedForecast = forecastData.map(eachWeatherDay => new Forecast(eachWeatherDay));
    console.log(formattedForecast);

    return { city: forecastData[0].city_name, weatherData: formattedForecast };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal server error' };
  }
}

module.exports = { getWeather };
