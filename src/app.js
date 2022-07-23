const express = require('express')
const cors = require('cors')

require('dotenv-safe').config()
const db = require('./database/mongoConfig')

const farmerRoutes = require('./routes/farmerRoutes')
const professionalRoutes = require('./routes/professionalRoutes')
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')
const index = require('./routes/indexRoutes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', index)
app.use('/farmer', farmerRoutes )
app.use('/professional', professionalRoutes)
app.use('/message', messageRoutes)
app.use('/user', userRoutes)

db.connect()
module.exports = app





