const { Schema, model } = require("mongoose");
const Users = require("./Users");

;


const orderSchema = new Schema({
  status: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    Ref: 'Users'
  },
  fecha: {
    type: Date,
  },
  produt: [{
    type: String,
  }],
  total: {
    type: Number,
  },

  payment_id: {
    type: String,
  },
  payment_status: {
    type: String,
    default: "",
  },
  payment_order_id: {
    type: String,
  },
});
module.exports = model("Ordenes", orderSchema);
