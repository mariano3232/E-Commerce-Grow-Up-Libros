const { Schema, model } = require("mongoose");

const libroSchema = new Schema({
  title: {
    type: String
  },
  author:[ {
    type:[Schema.Types.ObjectId],
    ref: 'Author'
  }],
  year: {
    type:Number
  },
  pages: {
    type:Number
  },
  editorial: {
    type:String
  },
  cover: {
    Type:String
  },
  rating: {
    Type:Number,
    default:0,
  },
  stock: {
    Type:Number,
    default:0
  },
  price: {
    type:Number,
    default:100
  },
  genres: {
    type:[Schema.Types.String]
  },
  review: {
    type:String
  },
});

module.exports = model('Libros', libroSchema)
