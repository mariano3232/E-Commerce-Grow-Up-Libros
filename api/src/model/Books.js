const { Schema, model } = require("mongoose");

const libroSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
  year: {
    type: Number,
  },
  pages: {
    type: Number,
    required: true,
  },
  editorial: {
    type: String,
  },
  cover: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 100,
  },
  genres: [
    {
      type: Schema.Types.String,
      ref: "Genre",
    },
  ],
  review: {
    type: String,
  },
});

module.exports = model("Book", libroSchema);