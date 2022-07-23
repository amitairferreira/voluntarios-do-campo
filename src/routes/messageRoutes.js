const controller = require('../controller/messageController')

const express = require('express')

const router = express.Router()

router.post('/send', controller.sendMessage)
router.get('/sendTo', controller.sendToId)
router.get('/received', controller.receivedToId)


module.exports = router;
