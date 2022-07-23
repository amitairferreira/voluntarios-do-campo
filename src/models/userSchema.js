const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    typeUser: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)

