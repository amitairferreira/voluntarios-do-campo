const ProfessionalSchema = require('../models/professionalSchema')

// Cadastrar Profissional
const createProfessional = async (req, res) => {
  const { name, profession, registryNumber, mainArea, state,
    city, email, contact, termOfCompromise } = req.body
  if(!mainArea || !profession || !city)  {
    return res.status(400).json({ message: 'Campo obrigatório para cadastro'})
  }

  const profissionalExiste = await ProfessionalSchema.findOne({email: req.body.email})
  if(profissionalExiste) {
    return res.status(400).json({ message: 'Email já cadastrado'})
  }
  try {
    const newProfessional = new ProfessionalSchema({
      name,
      profession,
      registryNumber,
      mainArea,
      state,
      city,
      email,
      contact,
      termOfCompromise
    })
    const savedProfessional = await newProfessional.save()
    res.status(201).json({
      message: 'Cadastro realizado com sucesso',
      savedProfessional
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Lista todos os Profissionais cadastrados
const getAll = async (req, res) => {
  try {
    const professionalall = await ProfessionalSchema.find()
    if(professionalall.length == 0) {
      return res.status(404).json({
        message: 'Nenhum profissional cadastrado'
      })
    }
    res.status(200).json({
      message: 'Lista de Profissionais.',
      professionalall
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Buscar profissional por cidade e por profissão
const getByCityProfession = async (req, res) => {
  const { city, profession } = req.query
  let query = {}

  if(city) query.city = new RegExp(city, 'i')
  if(profession) query.profession = new RegExp(profession, 'i')
  try {
    const allProfessional = await ProfessionalSchema.find(query)
    if(allProfessional.length == 0) {
      return res.status(404).json({
        message: 'Profissional não encontrado'
      })
    }
    res.status(200).json({
      message: 'Profissionais encontrados:',
      allProfessional
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Buscar Profissional por Id
const getById = async (req, res) => {
  try {
    const professional = await ProfessionalSchema.findById(req.params.id)

    if(!professional) {
      return res.status(404).json({
        message: 'Cadastro não encontrado.'
      })
    }
    res.status(200).json({
      message: 'Profissional:',
      professional
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Atualizar cadastro do profissional por id
const updateProfis = async (req, res) => {
  try {
    const professional = await ProfessionalSchema.findById(req.params.id)
  
    if(!professional) {
      return res.status(404).json({
        message: 'Cadastro não encontrado'
      })
    }
  
    professional.contact = req.body.contact || professional.contact
    
    const saveProfessional = await professional.save()
  
    res.status(200).json({
      message: 'Cadastro Atualizado com sucesso',
      saveProfessional
    })
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Deletar cadastro
const deleteProfis = async (req, res) => {
  try {
    const professional = await ProfessionalSchema.findById(req.params.id)

    if(!professional) {
      return res.status(404).json({
        message: 'Cadastro não encontrado'
      })
    }

    await professional.delete()

    res.status(200).json({
      message: 'Cadastro deletado com sucesso.',
      professional
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
module.exports = {
  createProfessional,
  getAll,
  getByCityProfession,
  getById,
  updateProfis,
  deleteProfis
}