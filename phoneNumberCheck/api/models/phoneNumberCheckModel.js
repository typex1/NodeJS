'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NDCSchema = new Schema({
  ndc: {
    type: String,
    unique: true, 
    required: [true, 'ndc is required'],
    dropDups: true
  },
  type: {
    type: String,
    enum: ['onkz', 'mobileNDC', 'sondernummer'],
    required: [true, 'type is required and must be an element of enumValues']
  },
  detail: {
    type: String,
    unique: false, 
    default: "-"
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('NDCs', NDCSchema);
