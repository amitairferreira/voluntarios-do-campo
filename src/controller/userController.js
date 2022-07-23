const UserSchema = require('../models/userSchema')
const { hashPassword } = require('../helpers/hashPassword')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCreate = async (req, res) => {
  try {
    const { name, typeUser, email, password } = req.body

    const newUser = new UserSchema({
      name,
      typeUser,
      email,
      password
    })

    const passwordHashed = await hashPassword(newUser.password, res)
    newUser.password = passwordHashed

    const user = await UserSchema.findOne({ email: req.body.email })

    if (user) {
      res.status(400).json({ message: 'Usuário já cadastrado.' })
    }

    const saveUser = await newUser.save()

    res.status(201).json({
      message: 'Cadastro realizado com sucesso!',
      saveUser
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const userAll = async (req, res) => {
  try {
    const usersAll = await UserSchema.find()
    if(usersAll.length == 0) {
      return res.status(404).json({
        message: 'Não há usuários cadastrados'
      })
    }

    res.status(200).json({
      message: 'Usuários cadastrados:',
      usersAll
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserSchema.findOne({ email: email }).select('+password')

    if (!user) {
      return res.status(400).json({
        message: 'Email ou senha incorreto.'
      })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
      return res.status(400).json({
        message: 'Email ou senha incorreto.'
      })
    }

    const SECRET = process.env.SECRET
    const token = jwt.sign({id: user._id, email: user.email}, SECRET)

    res.status(200).json({
      message: 'Login efetuado com sucesso.',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

updateUser = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id)

    if(user) {
      user.name = req.body.name || user.name
      user.typeUser = req.body.typeUser || user.typeUser
      user.email = req.body.email || user.email
      user.password = req.body.password || user.password

      const passwordHashed = await hashPassword(user.password, res)

      user.password = passwordHashed

      const saveUser = await user.save()
      res.status(200).json({
        message: 'Usuário atualizado com sucesso.',
        saveUser
      })
    }

    res.status(400).json({
      message: 'Usuário não encontrado'
    })
  } catch (error) {
    return res.status(404).send({
      message: error.message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id)

    if(user == null) {
      res.status(404).json({
        message: 'Usuário não encontrado.'
      })
    }
    await user.delete()

    res.status(200).json({
      message: 'Usuário deletado.',
      user
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


module.exports = {
  userCreate,
  userAll,
  login,
  updateUser,
  deleteUser
}
