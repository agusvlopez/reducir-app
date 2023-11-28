const express = require('express');
const ActionsController = require('../controllers/actions.js');

const router = express.Router();

router.post("/api/create", ActionsController.createAction);
router.get('/api/get/:id', ActionsController.getActionById);
router.get('/api/getAll', ActionsController.getAllActions);
router.put('/api/update/:id', ActionsController.updateAction);
router.delete('/api/delete/:id', ActionsController.deleteAction);

//user
router.get('/api/user/:userId', ActionsController.getUserById);

router.get('/api/users/get/:userId/favorites', ActionsController.getFavorites);
router.post('/api/users/create/:userId/favorites', ActionsController.addToFavorites);
router.delete('/api/users/delete/:userId/favorites/:favoriteId', ActionsController.deleteFavorite);

//carbon
router.get('/api/users/get/:userId/carbon', ActionsController.getCarbon);
router.post('/api/users/create/:userId/carbon', ActionsController.updateCarbon);

//achievements
router.get('/api/users/get/:userId/achievements', ActionsController.getAchievements);
router.post('/api/users/create/:userId/achievements', ActionsController.addToAchievements);


module.exports = router;