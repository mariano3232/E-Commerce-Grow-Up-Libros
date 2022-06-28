import { Schema, model } from 'mongoose'
const userSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
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
  },
  address: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: [''],
  },
  isSuperAdmin: {
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
})

export default model('User', userSchema)
