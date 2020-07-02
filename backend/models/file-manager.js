const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  file_name: {type: String},
  title: {type: String},
  type: {type: String},
  date: {type: Date}
});

module.exports = mongoose.model('file', fileSchema)
