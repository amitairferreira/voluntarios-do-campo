const controller = require('../controller/farmerController')

const express = require('express')

const router = express.Router()

router.post('/create', controller.createFarmer)
router.get('/all', controller.getAll)
router.get('/byStateCity', controller.getByStateCity)
router.get('/byId/:id', controller.getById)
router.patch('/update/:id', controller.updateFarmer)
router.delete('/delete/:id', controller.deleteFarmer)

module.exports = router;