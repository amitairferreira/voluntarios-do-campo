const MessageSchema = require('../models/messageSchema')
const FarmerSchema = require('../models/farmerSchema')
const ProfessionalSchema = require('../models/professionalSchema')

// Enviar messagens
const sendMessage = async (req, res) => {
  try {
    const { sentById, sendToId, typeUser, title, text } = req.body
    const newMessage = new MessageSchema({
      sentById,
      sendToId,
      typeUser,
      title,
      text
    })

    let sendByName = ''
    let sendToName = ''
    if (typeUser == 'Farmer') {
      sendByName = await FarmerSchema.findById(sentById)
      sendByName = sendByName.name
      sendToName = await ProfessionalSchema.findById(sendToId)
      sendToName = sendToName.name
    } else {
      sendByName = await ProfessionalSchema.findById(sentById)
      sendByName = sendByName.name
      sendToName = await FarmerSchema.findById(sendToId)
      sendToName = sendToName.name
    }
    newMessage.sentByName = sendByName
    newMessage.sendToName = sendToName
    const sendMessag = await newMessage.save()
    res.status(201).json({
      message: 'Menssagem enviada.',
      sendMessag
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Todas as mensagens enviadas pelo usuário (Id)
const sendToId = async (req, res) => {
  const { sentById } = req.query

  let query = {}

  if (sentById) query.sentById = sentById

  try {
    const sendAll = await MessageSchema.find(query)
    if (sendAll.length == 0) {
      return res.status(404).json({
        message: 'Não há mensagens enviadas.'
      })
    }

    sendAllActive = []
    sendAll.forEach(item => {
      if (
        (item.typeUser === 'Farmer' && !item.hideToFarmer) ||
        (item.typeUser === 'Professional' && !item.hideToProfessional)
      )
        sendAllActive.push(item)
    })

    res.status(200).json({
      message: 'Mensagens enviadas:',
      sendAllActive
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Todas as mensagens recebidas pelo usuário (id)
const receivedToId = async (req, res) => {
  const { sendToId } = req.query
  let query = {}

  if (sendToId) query.sendToId = sendToId
  try {
    const receivedAll = await MessageSchema.find(query)
    if (receivedAll.length == 0) {
      return res.status(404).json({
        message: 'Não há mensagens recebidas.'
      })
    }

    receivedAllActive = []
    receivedAll.forEach(item => {
      if (
        (item.typeUser === 'Farmer' && !item.hideToFarmer) ||
        (item.typeUser === 'Professional' && !item.hideToProfessional)
      )
        receivedAllActive.push(item)
    })

    res.status(200).json({
      message: 'Menssagens recebidas:',
      receivedAllActive
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

//excluir mensagens
const deleteMessageFarmer = async (req, res) => {
  try {
    const message = await MessageSchema.findById(req.params.id)

    if (!message) {
      return res.status(404).json({
        message: 'Mensagem não encontrada'
      })
    }

    message.hideToFarmer = true
    const deleteMessage = await message.save()

    res.status(200).json({
      message: 'Mensagem excluida.'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteMessageProfessional = async (req, res) => {
  try {
    const message = await MessageSchema.findById(req.params.id)

    if (!message) {
      return res.status(404).json({
        message: 'Mensagem não encontrada'
      })
    }

    message.hideToProfessional = true
    const deleteMessage = await message.save()

    res.status(200).json({
      message: 'Mensagem excluida.'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  sendMessage,
  sendToId,
  receivedToId,
  deleteMessageFarmer,
  deleteMessageProfessional
}
