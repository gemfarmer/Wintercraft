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
  //
  //

  var zip = 53434
  var apiKey = '68fc40cc59b03c11';
  var geoLookupUrl = "http://api.wunderground.com/api/"+apiKey+"/geolookup/q/autoip.json";
  var MinneapolisLookupUrl = "http://api.wunderground.com/api/"+apiKey+"/geolookup/q/Minneapolis Crystal.json";
  var demoUrl = 'http://api.wunderground.com/api/'+apiKey+'/conditions/q/CA/San_Francisco.json'

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

function handleError(res, err) {
  return res.send(500, err);
}