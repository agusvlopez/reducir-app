import express from 'express';
import AccountController from '../controllers/account.js';
import { validateAccount, validateAccountEdit, verifySession, validateAccountFavorites } from '../middleware/account.js';

const route = express.Router();

//register
route.post('/account', AccountController.createAccount);

//login
route.post('/session', [validateAccount], AccountController.login);

//logout
route.delete('/session', [verifySession], AccountController.logout)

//user
route.get('/account', AccountController.getUsers);
route.get('/account/:accountId', AccountController.getUserById);
route.delete('/account/:accountId', AccountController.deleteUser);
//edit
route.put('/account/:accountId', [validateAccountEdit], AccountController.updateAccount);

//favorites
route.get('/account/:accountId/favorites', AccountController.getFavorites);
// route.put('/account/:accountId/favorites', [validateAccountFavorites], AccountController.addToFavorites);
// route.delete('/account/:accountId/favorites/:idFavorite', AccountController.removeFromFavorites);
route.delete('/account/:accountId/favorites/:favoriteId', [verifySession], AccountController.removeFavorite);
route.put('/account/:accountId/favorites', [verifySession], AccountController.updateFavorites);

//carbon
route.get('/account/:accountId/carbon', AccountController.getCarbon);
route.put('/account/:accountId/carbon', [verifySession], AccountController.updateCarbon);

//achievements
route.get('/account/:accountId/achievements', AccountController.getAchievements);
route.get('/account/:accountId/achievements/:achievementId', [verifySession], AccountController.getAchievementById);
route.delete('/account/:accountId/achievements/:achievementId', [verifySession], AccountController.removeAchievement);
route.put('/account/:accountId/achievements', [verifySession], AccountController.updateAchievements);

export default route;