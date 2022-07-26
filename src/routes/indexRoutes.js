const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  res.send(
    'Projeto: Voluntários do campo. Cadastra, atualiza, pesquisa por cidade e por Id produtores e profissionais'
  )
})
module.exports = routes
