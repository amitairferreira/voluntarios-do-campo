const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  res.status(200).send({
    title: 'Projeto final Reprograma: Voluntários do Campo',
    version: '1.0.0',
    mensagem:
      ' Essa é a primeira versão deste projeto, uma API focada em cadastro de produtores da agricultura familiar e profissionais voluntários da agropecuária.'
  })
})

module.exports = routes
