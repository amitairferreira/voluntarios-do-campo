const controller = require ('../controller/professionalController')

const express = require('express')

const router = express.Router()

router.post('/create', controller.createProfessional)
router.get('/all', controller.getAll)
router.get('/byCityProfession', controller.getByCityProfession)
router.get('/byId/:id', controller.getById)
router.patch('/update/:id', controller.updateProfis)
router.delete('/delete/:id', controller.deleteProfis)

module.exports = router