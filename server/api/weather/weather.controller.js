'use strict';

var _ = require('lodash');
var Weather = require('./weather.model');
var request = require('request');
// Get list of weathers
exports.index = function(req, res) {
  // Weather.find(function (err, weathers) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, weathers);
  // });
var apikey = f0978770121b8234
    
  var geoLookupUrl = "http://api.wunderground.com/api/"+apikey+"/geolookup/q/autoip.json";
  var MinneapolisLookupUrl = "http://api.wunderground.com/api/"+apikey+"/geolookup/q/Minneapolis Crystal.json";
  var demoUrl = "http://api.wunderground.com/api/f0978770121b8234/"+apikey+"/q/CA/San_Francisco.json"
  var hourlyLookup = "http://api.wunderground.com/api/f0978770121b8234/"+apikey+"/q/CA/San_Francisco.json"
  request(geoLookupUrl,function(request,response){

    console.log('data: ', response.body)
    return res.json(200,response.body)
  });
};

// Get a single weather
exports.show = function(req, res) {
  Weather.findById(req.params.id, function (err, weather) {
    if(err) { return handleError(res, err); }
    if(!weather) { return res.send(404); }
    return res.json(weather);
  });
};



// Creates a new weather in the DB.
exports.create = function(req, res) {
  Weather.create(req.body, function(err, weather) {
    if(err) { return handleError(res, err); }
    return res.json(201, weather);
  });
};

// Updates an existing weather in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Weather.findById(req.params.id, function (err, weather) {
    if (err) { return handleError(res, err); }
    if(!weather) { return res.send(404); }
    var updated = _.merge(weather, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, weather);
    });
  });
};

// Deletes a weather from the DB.
exports.destroy = function(req, res) {
  Weather.findById(req.params.id, function (err, weather) {
    if(err) { return handleError(res, err); }
    if(!weather) { return res.send(404); }
    weather.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

//extract information 
    //go into WUNDERGROUND API, get estimated closest station, get tempterature forecast for the next 16 hours, make array [temp.hr1, temp. hr2...]

//calculate time from array and diameter
    // r= (1/2)d (convert to centimeters)
    // V = (4/3)pi r^2 (cm^3)
    // SA = 4 pi r^2 (cm)
    // Weight = .9997 * V  (g)
    // T start = 13 deg C (est. tap water temperature)
    // T end = 0 deg C
    // ^Q per second = T start * 4.186 * weight  (joules)
    // h = 3.5 (adjustable heat constant)
 calculates temp change over an hour// for each hour, calculate ^Q hourly =3600(Tcurrent - Tambient)(h)(SA/10000) then take Tcurrent = Tcurrent- ^Qhourly/(4.186*weight
// when Tcurrent <0, take currenthour - currenthour(Tstart)/(Tstart-Tcurrent) = time to freeze completely
// take 70% of time to freeze completely


function handleError(res, err) {
  return res.send(500, err);
}