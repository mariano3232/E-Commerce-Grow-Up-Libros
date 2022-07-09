const { Schema, model } = require("mongoose");





const orderSchema = new Schema({
  status: {
    type: String,
  },
<<<<<<< Updated upstream
  usuario: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
=======

  usuario: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
>>>>>>> Stashed changes
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
  status_order: {
    type: String,
    default: "",
  },
<<<<<<< Updated upstream
  payment_order_id: {
    type: String,
  },
});
module.exports = model("Orders", orderSchema);
=======
 
  isHidden: {
    type: Boolean,
    default: false,
  },
})
module.exports = model('Orders', orderSchema)
>>>>>>> Stashed changes
