const FarmerSchema = require('../models/farmerSchema')

// Cadastrar Produtores
const createFarmer = async (req, res) => {
  const {
    name, state, city, road, number, registryCar, cultivatedArea, activities,
    organicCultivation, email, contact, termOfCompromise } = req.body
  if (!name || !activities) {
    return res.status(400).json({ message: 'Campo obrigatório para cadastro' })
  }

  const farmerExiste = await FarmerSchema.findOne({email: req.body.email})
  if(farmerExiste) {
    return res.status(400).json({ message: 'Email já cadastrado'})
  }
  try {
    const newFarmer = new FarmerSchema({
      name,
      state,
      city,
      road,
      number,
      registryCar,
      cultivatedArea,
      activities,
      organicCultivation,
      email,
      contact,
      termOfCompromise
    })
    const savedFarmer = await newFarmer.save()
    res.status(201).json({
      message: 'Cadastro realizado com sucesso',
      savedFarmer
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Lista todos os Produtores cadastrados
const getAll = async (req, res) => {
  try {
    const farmerAll = await FarmerSchema.find()
    if(farmerAll.length == 0) {
      return res.status(404).json({
        message: 'Não há produtores cadastrados'
      })
    }
    res.status(200).json({
      message: 'Produtores cadastrados:',
      farmerAll
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

}

// Buscar Produtor por estado e por cidade
const getByStateCity = async (req, res) => {
  const { state, city } = req.query
  let query = {}
  
  if(state) query.state = new RegExp(state, 'i')
  if(city) query.city = new RegExp(city, 'i')
  try {
    const allFarmer = await FarmerSchema.find(query)
    if(allFarmer.length == 0) {
      return res.status(404).json({
        message: 'Nenhum produtor encontrado'
      })
    }
    res.status(200).json({
      message: 'Produtores encontrados no estado:',
      allFarmer
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
  
// Buscar Produtor por Id
const getById = async (req, res) => {
  try {
    const farmer = await FarmerSchema.findById(req.params.id)

    if(!farmer) {
      return res.status(404).json({
        message: 'Cadastro não encontrado.'
      })
    }
    res.status(200).json({
      message: 'Produtor:',
      farmer
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Atualizar cadastro do produtor por Id
const updateFarmer = async (req, res) => {
  try {
    const farmer = await FarmerSchema.findById(req.params.id)

    if(!farmer) {
      return res.status(404).json({
        message: 'Cadastro não encontrado'
      })
    }

    farmer.activities = req.body.activities || farmer.activities
    farmer.contact = req.body.contact || farmer.contact

    const saveFarmer = await farmer.save()

    res.status(200).json({
      message: 'Cadastro Atualizado com sucesso.',
      saveFarmer
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Deletar cadastro
const deleteFarmer = async (req, res) => {
  try {
    const farmer = await FarmerSchema.findById(req.params.id)

    if(!farmer) {
      return res.status(404).json({
        message: 'Cadastro não encontrado.'
      })
    }

    await farmer.delete()

    res.status(200).json({
      message: 'Cadastro deletado com sucesso.',
      farmer
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
    
module.exports = {
  createFarmer,
  getAll,
  getByStateCity,
  getById,
  updateFarmer,
  deleteFarmer
}
  
  
