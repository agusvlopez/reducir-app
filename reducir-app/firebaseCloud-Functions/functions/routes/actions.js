const express = require('express');
const ActionsController = require('../controllers/actions.js');

const router = express.Router();

router.post("/api/create", ActionsController.createAction);
router.get('/api/get/:id', ActionsController.getActionById);
router.get('/api/getAll', ActionsController.getAllActions);
router.put('/api/update/:id', ActionsController.updateAction);
router.delete('/api/delete/:id', ActionsController.deleteAction);

router.get('/api/users/get/:userId/favorites', ActionsController.getFavorites);

module.exports = router;