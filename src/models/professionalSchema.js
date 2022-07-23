const mongoose = require('mongoose')

const ProfessionalSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  registryNumber: {
    type: String,
    required: true,
    unique: true
  },
  mainArea: {
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

module.exports = mongoose.model('Professional', ProfessionalSchema)
