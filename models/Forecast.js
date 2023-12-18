
class Forecast {
  constructor(eachWeatherDay) {
    this.date = eachWeatherDay.datetime;
    this.description = eachWeatherDay.weather.description;
  }
}

module.exports = Forecast;
