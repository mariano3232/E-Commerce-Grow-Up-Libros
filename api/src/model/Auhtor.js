const { Schema, model } = require("mongoose");

const auhtorSchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  birth: {
    type: Date,
    default: new Date(),
  },
  country: {
    type: String,
  },
  picture:{
    type:String
  },
  biography: {
    type: String,
  },
});

module.exports = model("Auhtor", auhtorSchema);
