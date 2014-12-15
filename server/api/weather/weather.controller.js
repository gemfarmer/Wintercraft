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
        
        //NOTE: tempArrays first temp field is vacant, not sure how to fix this) ///
     
        
    //setting up variables    
    var pi = Math.PI     
    var diameter = 40; //cm; should be user input
    var radius = diameter/2;
    var volume = 4/3*pi*Math.pow(radius,3);
    var surfaceArea = 4 * pi * radius * radius; //cm^2
    var surfaceAreaInSquareMeters = surfaceArea/100 //m^2
    var weight = .9997 * volume; //grams
    var tempStart = 13;  //estimated tap water temperature
    var tempEnd = 0;  //freezing point
    var heatTransferCoefficent = 3.5; ///We have no idea what this is, it will be our primary means of adjusting the model to fit data
    var tempCurrent = tempStart;
    
   //Doing the first fractional hour     
    var hour=0;
    var momentTime=moment().format();
    var currentMinute = momentTime.slice(-11,-9);
        
    var percentHourRemaining=(60-currentMinute)/60;
    var energyChangeFirstHour=  percentHourRemaining*3600*(tempCurrent - tempArray[1].temp)*heatTransferCoefficent;  //should be                                                                                           tempArray[0], but as in line 55's note, that data isn't there
    var tempEndOfFirstHour = tempCurrent-energyChangeFirstHour/(4.186 * weight);
    tempCurrent = tempEndOfFirstHour;

    //doing the rest of the hours
    hour=1;
    var energyChangeHourly;
    while (tempCurrent > tempEnd) {
        energyChangeHourly = 3600*(tempCurrent - tempArray[hour].temp)*heatTransferCoefficent;  //currently does not include surface area
        tempCurrent = tempCurrent - energyChangeHourly / (4.186 * weight)
        
       hour = hour + 1;
    }
        

var extraFractionHour = (0-tempCurrent)/(energyChangeHourly/(4.186 * weight));  //adjusts for fractional hour at end
var timeComplete=(currentMinute/60)+(hour-1) - extraFractionHour;
var time70 = .7* timeComplete; //time to freeze 70%, final answer

console.log(time70)

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