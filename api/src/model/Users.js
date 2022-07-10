const { Schema, model } = require('mongoose')
const userSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  birthday: {
    type: String,
    default: '',
  },
  dni: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  ciudad: {
    type: String,
    default: '',
  },
  postal: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  isPremiun: {
    type: Boolean,
    default: false,
  },
  isAdminData: {
    type: Boolean,
    default: false,
  },
  isAdminStock: {
    type: Boolean,
    default: false,
  },
  isAdminUsers: {
    type: Boolean,
    default: false,
  },
  isAdminOrders: {
    type: Boolean,
    default: false,
  },
  isAdminMarketing: {
    type: Boolean,
    default: false,
  },
  readBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Books',
    },
  ],
  favouritesBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Books',
    },
  ],
  buyBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Books',
    },
  ],
  ratingBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Books',
    },
  ],
  isSubscribeNewsLetter: {
    type: Boolean,
    default: false,
  },
})

module.exports = model('Users', userSchema)
