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

//favorites
const getFavorites = async (req, res) => {
  const userId = req.params.userId;
    try {
      //setLoading(true);
      
      const favorites = await ActionsService.getFavoritesByUserId(userId);
      return res.status(201).json({favorites});
      // Actualiza el estado de Redux con los favoritos obtenidos
      //setFavorites(favorites);
  
      //setLoading(false);
    } catch (error) {
      console.error('Error al obtener los favoritos:', error);
      res.status(500).json({ error: 'Error interno del servidor:' + error });
    } 
  //   finally {
  //     setLoading(false);
  //   }
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
  //   finally {
  //     setLoading(false);
  //   }
};

module.exports = {
  createAction,
  getActionById,
  getAllActions,
  updateAction,
  deleteAction,
  getFavorites,
  getCarbon
};