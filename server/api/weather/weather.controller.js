'use strict';

var _ = require('lodash');
var Weather = require('./weather.model');
var request = require('request');
var moment = require('moment');

// Get list of weathers
exports.index = function(req, res) {
  // Weather.find(function (err, weathers) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, weathers);
  // });

//extract information
    //go into WUNDERGROUND API, get estimated closest station, get tempterature forecast for the next 16 hours, make array [temp.hr1, temp. hr2...]



  var apikey = 'f0978770121b8234';
  // var apikey = '68fc40cc59b03c11';

  var geoLookupUrl = "http://api.wunderground.com/api/"+apikey+"/geolookup/q/autoip.json";
  var MinneapolisLookupUrl = "http://api.wunderground.com/api/"+apikey+"/geolookup/q/Minneapolis Crystal.json";
  var demoUrl = "http://api.wunderground.com/api/"+apikey+"/q/CA/San_Francisco.json";


//function to generate array of [temp time]
  request(geoLookupUrl,function(request2,response2){
    console.log('data: ', JSON.parse(response2.body).location.nearby_weather_stations.pws.station[0] )
    var closestStation = JSON.parse(response2.body).location.nearby_weather_stations.pws.station[0];
    var hourlyLookup = "http://api.wunderground.com/api/"+
                        apikey+"/hourly10day/q/"+
                        closestStation.state+"/"+
                        closestStation.city+".json";
    // console.log(hourlyLookup)

    request(hourlyLookup,function(request3,response3){

      var now = moment();
      var endOfHour = now.endOf('hour');
      var tempArray = [{
        temp: '',
        time: now.format()
      }];
      _.forEach(JSON.parse(response3.body).hourly_forecast,function(value){
        // console.log(index)
        var dataPoint = {
          temp: value.temp.metric,
          time: endOfHour.add(1, 'hours').format()
        }
        tempArray.push(dataPoint);
      });
      console.log(tempArray)

      //function to calculate expected freezing time

      //calculate time from array and diameter
    // r= (1/2)d (convert to centimeters)
    // V = (4/3)pi r^2 (cm^3)
    // SA = 4 pi r^2 (cm)
    // Weight = .9997 * V  (g)
    // T start = 13 deg C (est. tap water temperature)
    // T end = 0 deg C
    // ^Q per second = T start * 4.186 * weight  (joules)
    // h = 3.5 (adjustable heat constant)
 // calculates temp change over an hour for each hour, calculate ^Q hourly =3600(Tcurrent - Tambient)(h)(SA/10000) then take Tcurrent = Tcurrent- ^Qhourly/(4.186*weight
// when Tcurrent <0, take currenthour - currenthour(Tstart)/(Tstart-Tcurrent) = time to freeze completely
// take 70% of time to freeze completely

      return res.json(200,response2.body)
    })

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