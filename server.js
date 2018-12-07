'use strict';

const express = require('express');
const cors = require('cors');

//Load env vars
require('dotenv').config();

const PORT = process.env.PORT;

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

//Give error message if incorrect;

app.get('/*', function(req, res){
  res.status(404).send('you are in the wrong place');
})

//THIS must be at bottom of code!!!
app.listen(PORT, () => {
  console.log(`app is up at port: ${PORT}.`)
})

