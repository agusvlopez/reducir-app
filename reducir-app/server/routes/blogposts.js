import express from 'express';
import BlogpostsController from '../controllers/blogposts.js'
import multer from 'multer';

const route = express.Router();
const storage = multer.memoryStorage();

const fileUpload = multer().single('image');

route.get('/blogposts', BlogpostsController.getAllBlogposts);
route.get('/blogposts/:accountId', BlogpostsController.getBlogpostsByID);
route.get('/blogpost/:blogpostId', BlogpostsController.getBlogpostByPostID);
route.post('/blogposts', fileUpload, BlogpostsController.createBlogpost);
// route.delete('/actions/:actionId', ActionsController.deleteAction);
// route.put('/actions/:actionId', fileUpload, ActionsController.updateAction);

export default route;