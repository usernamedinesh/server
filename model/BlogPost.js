
const mongoose = require('mongoose');

const blogPostSchema= new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
