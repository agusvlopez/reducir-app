const ActionsService = require('../services/actions.js');

async function createAction(req, res) {
  try {
    const action = await ActionsService.createAction(req.body)
    .then(function(action){
        res.status(201).json(action);
        console.log(action);
    })
    // res.status(201).json(action);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
}

async function getActionById(req, res) {

  try {
    const actionId = req.params.id;
    const actionDetail = await ActionsService.getActionById(actionId);
    return res.status(201).json(actionDetail);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.msg });
  }
    // return res.status(201).json(actionDetail);
  
}

const getAllActions = async (req, res) => {
  try {
      const response = await ActionsService.getAllActions();
      return res.status(201).json(response);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.msg });
  }
};

const updateAction = async (req, res) => {
  try {
      const itemId = req.params.id;
      const newData = {
          title: req.body.title,
          description: req.body.description,
          tip: req.body.tip,
          image: req.body.image,
          alt: req.body.alt,
          category: req.body.category,
          carbon: req.body.carbon,
          points: req.body.points
      };

      const response = await ActionsService.updateAction(itemId, newData);
      return res.status(201).json(response);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.msg });
  }
};

const deleteAction = async (req, res) => {
  try {
      const itemId = req.params.id;
      const response = await ActionsService.deleteAction(itemId);

      return res.status(201).json(response);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.msg });
  }
};

//user
const getUserById = async (req, res) => {
    try {
      const userId = req.params.userId;      
      const user = await ActionsService.getUserById(userId);
      return res.status(201).json({user});

    } catch (error) {
      console.error('Error al obtener los favoritos:', error);
      res.status(500).json({ error: 'Error interno del servidor:' + error });
    } 

};

//favorites
const getFavorites = async (req, res) => {
  const userId = req.params.userId;
    try {      
      const favorites = await ActionsService.getFavoritesByUserId(userId);
      return res.status(201).json({favorites});

    } catch (error) {
      console.error('Error al obtener los favoritos:', error);
      res.status(500).json({ error: 'Error interno del servidor:' + error });
    } 

};

const addToFavorites = async (req, res) => {
  const userId = req.params.userId;
  const newFavorite = req.body;

  try {
    const updatedFavorites = await ActionsService.addToFavorites(userId, newFavorite);
    return res.status(201).json({ favorites: updatedFavorites });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//carbon
const getCarbon = async (req, res) => {
  const userId = req.params.userId;
    try {
      //setLoading(true);
      
      const carbon = await ActionsService.getCarbonByUserId(userId);
      return res.status(201).json(carbon);
      // Actualiza el estado de Redux con los favoritos obtenidos
      //setFavorites(favorites);
  
      //setLoading(false);
    } catch (error) {
      console.error('Error al obtener los favoritos:', error);
      res.status(500).json({ error: 'Error interno del servidor:' + error });
    } 
};

const updateCarbon = async (req, res) => {
  const userId = req.params.userId;
  const newCarbon = req.body.carbon;

  try {      
   await ActionsService.updateCarbon(userId, newCarbon);
    return res.status(201).json({ carbon: newCarbon });
  } catch (error) {
    console.error('Error al actualizar el valor de carbono:', error);
    res.status(500).json({ error: 'Error interno del servidor:' + error.message });
  } 
};

const getAchievements = async (req, res) => { 
  const userId = req.params.userId;
  try {
    const achievements = await ActionsService.getAchievementsByUserId(userId);
  
    // Devolver los logros en la respuesta
    return res.status(201).json(achievements);
  } catch (error) {
    console.error('Error en el controlador getAchievements:', error);
  
    // Manejar errores específicos
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    // Devolver un código de estado 500 y un mensaje de error genérico
    return res.status(500).json({ error: 'Error interno del servidor', error });
  }
}

const addToAchievements = async (req, res) => {
  const userId = req.params.userId;
  const newAchievement = req.body;

  try {
    const updatedAchievements = await ActionsService.addToAchievements(userId, newAchievement);
    return res.status(201).json(updatedAchievements);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  try {
      const userId = req.params.userId;
      const favoriteId = req.params.favoriteId;
      const response = await ActionsService.deleteFavorite(userId, favoriteId);

      return res.status(201).json(response);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.msg });
  }
};

module.exports = {
  createAction,
  getActionById,
  getAllActions,
  updateAction,
  deleteAction,
  getFavorites,
  getCarbon,
  addToFavorites,
  getAchievements,
  addToAchievements,
  deleteFavorite,
  updateCarbon,
  getUserById
};