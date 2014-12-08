'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SettingSchema = new Schema({
  name: String,
  info: String,
  sizing: {
    weight: Number,
    diameter: Number,
    length: Number
  },
  alert:{
    email: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: true
    },
    warning: {
      type: Number,
      default: 1
    }
  },
  location: {
    current:Boolean,
    zip: Number,
    home: Number
  }

});

module.exports = mongoose.model('Setting', SettingSchema);