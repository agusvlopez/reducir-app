import express from 'express';
import AchievementsController from '../controllers/achievements.js'
import multer from 'multer';

const route = express.Router();
const storage = multer.memoryStorage();

const fileUpload = multer().single('image');

route.get('/achievements', AchievementsController.getAchievements);
// route.get('/blogposts/:accountId', BlogpostsController.getBlogpostsByID);
route.get('/achievementspost/:achievementId', AchievementsController.getAchievementByPostID);
route.post('/achievements', fileUpload, AchievementsController.createAchievement);
// route.delete('/actions/:actionId', ActionsController.deleteAction);
// route.put('/actions/:actionId', fileUpload, ActionsController.updateAction);

export default route;