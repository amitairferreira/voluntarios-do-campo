const controller = require('../controller/messageController')
const { checkAuth } = require('../middlewares/auth')
const express = require('express')

const router = express.Router()

router.post('/send', checkAuth, controller.sendMessage)
router.get('/sendTo', checkAuth, controller.sendToId)
router.get('/received', checkAuth, controller.receivedToId)


module.exports = router;
