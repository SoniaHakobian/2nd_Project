
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PhotoSchema = new Schema(
  {  img:
      { data: Buffer, contentType: String }
  }
);


module.exports = mongoose.model('photo-schema', PhotoSchema);
