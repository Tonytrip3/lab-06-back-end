'use strict';
let weeklyArr = [];

const express = require('express');
const cors = require('cors');

//Load env vars
require('dotenv').config();

const PORT = process.env.PORT || 3000;

//app
const app = express();

app.use(cors());

//Get Location data;

app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data);
  
  response.send(locationData);
})

function searchToLatLong(query){
  const geoData = require('./data/geo.json');
  const location = new Location(geoData.results[0]);
  return location;
}

//data front end needs
function Location(location){
  this.formatted_query = location.formatted_query;
  this.latitude = location.geometry.location.lat;
  this.longitude = location.geometry.location.lng;
}

//Get weather data

app.get('/weather', (request, response) => {
  const weatherData = dailyForecast(request.query.data);

  response.send(weeklyArr);
})

//New weather objects
function dailyForecast(query) {
  const darkskyData = require('./data/darksky.json');
  for(let i in darkskyData.daily.data) {
  const weather = new Weather(darkskyData.daily.data[i]);
  weeklyArr.push(weather);
  
  }

}


//Create constructor function
function Weather(weather) {
  this.forecast = weather.summary;
  this.time = weather.time;
 
}

//Give error message if incorrect

app.get('/*', function(req, res){
  res.status(404).send('you are in the wrong place');
})

//THIS must be at bottom of code!!!
app.listen(PORT, () => {
  console.log(`app is up at port: ${PORT}.`)
})

