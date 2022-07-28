const controller = require('../controller/messageController')
const { checkAuth } = require('../middlewares/auth')
const express = require('express')

const router = express.Router()

router.post('/send', checkAuth, controller.sendMessage)
router.get('/sendTo', checkAuth, controller.sendToId)
router.get('/received', checkAuth, controller.receivedToId)
router.patch('/deleteMessageFarmer/:id', checkAuth, controller.deleteMessageFarmer)
router.patch('/deleteMessageProfessional/:id', checkAuth, controller.deleteMessageProfessional)


module.exports = router;
