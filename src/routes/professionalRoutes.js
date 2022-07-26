const controller = require ('../controller/professionalController')
const { checkAuth } = require('../middlewares/auth')
const express = require('express')

const router = express.Router()

router.post('/create', controller.createProfessional)
router.get('/all', controller.getAll)
router.get('/byCityProfession', controller.getByCityProfession)
router.get('/byId/:id', controller.getById)
router.patch('/update/:id', checkAuth, controller.updateProfis)
router.delete('/delete/:id', checkAuth, controller.deleteProfis)

module.exports = router