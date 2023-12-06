require('dotenv').config();
const express = require('express');
// const weatherData = require('data/weather.json');
const app = express();
const PORT =process.env.PORT || 3000;
// this returns an express app


// define routes
// app.get('/',(request,response) => {
//   response.json({message: 'kittens'});
// });

// app.get('/kittens',(request,response) => {
//   response.json({message: 'kittens'});
// });

app.get('/weather', (request,response) => {
  const { lat, lon, searchQuery } = request.query;
  response.json({ lat, lon, searchQuery });
});



app.listen(PORT, () => {
  console.log(`server in running on port ${PORT}`);
});
