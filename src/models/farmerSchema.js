const mongoose = require('mongoose')

const FarmerSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  road: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  registryCar: {
    type: String,
    required: true,
    unique: true
  },
  cultivatedArea: {
    type: String,
    required: true
  },
  activities: {
    type: String,
    required: true
  },
  organicCultivation: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  contact: {
    type: String,
    required: true
  },
  termOfCompromise: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Farmer', FarmerSchema)