import express from 'express';
import ActionsController from '../controllers/actions.js'
import multer from 'multer';

const route = express.Router();
const storage = multer.memoryStorage();

const fileUpload = multer().single('image');

route.get('/actions', ActionsController.getActions);
route.get('/actions/:actionId', ActionsController.getActionByID);
route.post('/actions', fileUpload, ActionsController.createAction);
route.delete('/actions/:actionId', ActionsController.deleteAction);
route.put('/actions/:actionId', fileUpload, ActionsController.updateAction);

export default route;