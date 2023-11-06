const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    count: { type: Number, required: true },
  });
  
  const Visitor = mongoose.model('Visitor', visitorSchema);
  module.exports= Visitor;