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
  picture: {
    type: String,
  },
  biography: {
    type: String,
  },
  books: [
    {
      type: [Schema.Types.ObjectId],
      ref: "Book",
    },
  ],
});

module.exports = model("Author", auhtorSchema);
