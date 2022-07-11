const { Schema, model } = require('mongoose')

const commentsSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Books',
      },
    ],
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = model('Comments', commentsSchema)
