/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');
var request = require('request');

// Get list of things
exports.index = function(req, res) {
  // Thing.find(function (err, things) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, things);
  // });
  //
  // var geoLookupUrl = "http://api.wunderground.com/api/68fc40cc59b03c11/geolookup/q/autoip.json";
  // var MinneapolisLookupUrl = "http://api.wunderground.com/api/68fc40cc59b03c11/geolookup/q/Minneapolis Crystal.json";
  // var demoUrl = 'http://api.wunderground.com/api/68fc40cc59b03c11/conditions/q/CA/San_Francisco.json'
  // request(geoLookupUrl,function(request,response){
  //   console.log('data: ', response.body)
  //   return res.json(200,response.body)
  // });
};

// Get a single thing
exports.show = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Thing.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}