const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    sentById: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    sendToId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    typeUser: {
      type: String,
      required: true
    },
    sentByName: {
      type: String,
      required: false
    },
    sendToName: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    hideToFarmer: {
      type: Boolean,
      default: false
    },
    hideToProfessional: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
