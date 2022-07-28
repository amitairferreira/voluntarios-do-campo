const controller = require('../controller/userController')
const { checkAuth } = require('../middlewares/auth')
const express = require('express')

const router = express.Router()

router.post('/create', controller.userCreate)
router.get('/getUser/:id', controller.userById)
router.post('/login', controller.login)
router.patch('/update/:id', checkAuth, controller.updateUser)
router.delete('/delete/:id', checkAuth, controller.deleteUser)

module.exports = router