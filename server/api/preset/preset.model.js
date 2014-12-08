'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PresetSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  zip: String
});

module.exports = mongoose.model('Preset', PresetSchema);