const controller = require('../controller/messageController')
// const { checkAuth } = require('../middlewares/auth')
const express = require('express')

const router = express.Router()

router.post('/send', controller.sendMessage)
router.get('/sendTo', controller.sendToId)
router.get('/received', controller.receivedToId)
router.patch('/deleteMessageFarmer/:id', controller.deleteMessageFarmer)
router.patch('/deleteMessageProfessional/:id', controller.deleteMessageProfessional)


module.exports = router;
