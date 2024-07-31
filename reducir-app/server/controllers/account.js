import { uploadFile } from '../functions/uploadFile.js';
import * as AccountService from '../services/account.js';
import { MongoClient, ObjectId } from 'mongodb';

function createAccount(req, res) {
    AccountService.createAccount(req.body)
        .then((account) => {
            res.status(201).json({ msg: "Cuenta creada con éxito", account });
        })
        .catch((err) => {
            res.status(500).json({ msg: "Fallo al crear la cuenta", err })
        })
}

function login(req, res) {
    AccountService.createSession(req.body)
        .then((session) => {
            res.status(201).json({ msg: "Cuenta creada con éxito", session });
        })
        .catch(() => {
            res.status(500).json({ msg: "Fallo iniciar sesion" })
        })
}

function logout(req, res) {
    AccountService.deleteSession(req.token)
        .then((session) => {
            res.status(201).json({ msg: "Cuenta eliminada con éxito" });
        })
        .catch(() => {
            res.status(500).json({ msg: "Fallo cerrar sesion" })
        })
}

async function updateAccount(req, res) {
    try {
        const { accountId } = req.params;
        const { body } = req;
        console.log('ID del usuario:', accountId);
        console.log('Datos del usuario para actualizar:', body);

        // Si no hay un nuevo archivo, solo actualiza la información del producto sin cargar un nuevo archivo
        // if (!file) {
        const updatedAccount = await AccountService.updateAccount(accountId, body);
        console.log(updatedAccount);
        res.status(200).json(updatedAccount);
        //return;
        //}

        // Si hay un nuevo archivo, carga el archivo y luego actualiza la información del producto
        // const { downloadURL } = await uploadFile(file);
        // const updatedProduct = await AccountService.updateAccount(idProduct, { ...body });
        // console.log(updatedProduct);

        res.status(200).json(updatedAccount);
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Internal Server Error controller' });
    }
}

//user+
function getUsers(req, res) {

    AccountService.getAccounts(req.query)
        .then(function (actions) {
            res.status(200).json(actions);
        })
        .catch(function (err) {
            res.status(500).json({ msg: "No se encuentra el usuario" });
        })
}

async function getUserById(req, res) {
    try {
        const accountId = req.params.accountId;

        if (!ObjectId.isValid(accountId)) {
            return res.status(400).json({ error: 'Invalid accountId format' });
        }

        const account = await AccountService.getAccountByID(accountId);
        return res.status(201).json({ account });

    } catch (error) {
        console.error('Error al obtener los favoritos:', error);
        res.status(500).json({ error: 'Error interno del servidor:' + error });
    }
}

async function deleteUser(req, res) {
    try {
        const { accountId } = req.params;

        // Lógica para eliminar el producto con el actionId
        const result = await AccountService.deleteAccount(accountId);

        if (result.deletedCount == 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getFavorites(req, res) {
    try {
        const { accountId } = req.params;

        const favorites = await AccountService.getFavoritesByAccountId(accountId);
        return res.status(201).json({ favorites });
    } catch (error) {
        console.error('Error al obtener los favoritos:', error);
        res.status(500).json({ error: 'Error interno del servidor:' + error });
    }

}

// async function addToFavorites(req, res) {
//     try {
//         const { accountId } = req.params;
//         const newFavorite = req.body.favorites;
//         const updatedFavorites = await AccountService.addToFavorites(accountId, newFavorite);
//         return res.status(201).json({ favorites: updatedFavorites });
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// }

// async function addToFavorites(req, res) {
//     try {
//         const { accountId } = req.params;
//         const newFavorites = req.body.favorites;

//         // Validar si newFavorites es un array
//         if (!Array.isArray(newFavorites)) {
//             return res.status(400).json({ error: 'El campo favorites debe ser un array' });
//         }

//         const updatedFavorites = await AccountService.addToFavorites(accountId, newFavorites);
//         return res.status(201).json({ favorites: updatedFavorites });
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// }

// async function removeFromFavorites(req, res) {
//     try {
//         const { accountId } = req.params;
//         const { favorites } = req.body;

//         const updatedFavorites = await AccountService.removeFromFavorites(accountId, favorites);
//         return res.status(200).json({ favorites: updatedFavorites });
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// }

async function addToAchievements(req, res) {
    try {
        const { accountId } = req.params;
        const { achievement } = req.body;

        // Validar si newFavorites es un array
        if (!Array.isArray(achievement)) {
            return res.status(400).json({ error: 'El campo achievement debe ser un array' });
        }

        const updatedAchievements = await AccountService.addToAchievements(accountId, achievement);
        return res.status(201).json({ achievement: updatedAchievements });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// const removeAchievement = async (req, res) => {
//     try {
//         const { accountId } = req.params;
//         const { achievementId } = req.params;

//         const updatedAchievements = await AccountService.removeAchievement(accountId, achievementId);
//         return res.status(200).json({ achievements: updatedAchievements });
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// };

async function removeFromAchievements(req, res) {
    try {
        const { accountId } = req.params;
        const { achievement } = req.body;

        const updatedAchievements = await AccountService.removeFromAchievements(accountId, achievement);
        return res.status(200).json({ achievements: updatedAchievements });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


const getCarbon = async (req, res) => {
    try {
        const { accountId } = req.params;

        const carbon = await AccountService.getCarbonByAccountId(accountId);
        return res.status(201).json({ carbon });
    } catch (error) {
        console.error('Error al obtener el carbon:', error);
        res.status(500).json({ error: 'Error interno del servidor:' + error });
    }
};

const getAchievements = async (req, res) => {
    try {
        const { accountId } = req.params;

        const achievements = await AccountService.getAchievementsByAccountId(accountId);
        return res.status(201).json({ achievements });
    } catch (error) {
        console.error('Error al obtener los logros:', error);
        res.status(500).json({ error: 'Error interno del servidor:' + error });
    }

};

const getAchievementById = async (req, res) => {
    try {
        const { accountId } = req.params;
        const { achievementId } = req.params;
        const achievement = await AccountService.getAchievementById(accountId, achievementId);
        return res.status(201).json(achievement);
    } catch (error) {
        console.error('Error al obtener el logro:', error);
        res.status(500).json({ error: 'Error interno del servidor:' + error });
    }
}

const updateAchievements = async (req, res) => {
    try {
        const { accountId } = req.params;
        const newAchievement = req.body;

        const achievementsUpdated = await AccountService.updateAchievements(accountId, newAchievement, req);
        console.log("favoritesUpdated", achievementsUpdated);
        res.status(201).json({ achievementsUpdated });
    } catch (err) {
        if (err.message === "Dont have an access token") {
            res.status(401).json({ message: "Unauthorized" });
        } else if (err.message === "Achievement already exists") {
            res.status(409).json({ message: "Achievement already exists" });  // 409 Conflict
        } else if (err.type) {
            res.sendStatus(403);
        } else {
            res.status(500).json({ "message": err.message });
        }
    }
}

const removeAchievement = async (req, res) => {
    try {
        const { accountId, achievementId } = req.params;

        const achievementsUpdated = await AccountService.removeAchievement(accountId, achievementId);
        res.status(200).json({ achievementsUpdated });
    } catch (err) {
        if (err.message === "Dont have an access token") {
            res.status(401).json({ message: "Unauthorized" })
        }
        else if (err.type) {
            res.sendStatus(403)
        } else {
            res.status(500).json({ "message": err.message })
        }
    }
}

const updateFavorites = async (req, res) => {
    try {
        const { accountId } = req.params;
        const newFavorite = req.body;

        const favoritesUpdated = await AccountService.updateFavorites(accountId, newFavorite, req);
        console.log("favoritesUpdated", favoritesUpdated);
        res.status(201).json({ favoritesUpdated });
    } catch (err) {
        if (err.message === "Dont have an access token") {
            res.status(401).json({ message: "Unauthorized" });
        } else if (err.message === "Favorite already exists") {
            res.status(409).json({ message: "Favorite already exists" });  // 409 Conflict
        } else if (err.type) {
            res.sendStatus(403);
        } else {
            res.status(500).json({ "message": err.message });
        }
    }
}


const removeFavorite = async (req, res) => {
    try {
        const { accountId, favoriteId } = req.params;

        const favoritesUpdated = await AccountService.removeFavorite(accountId, favoriteId);
        res.status(200).json({ favoritesUpdated });
    } catch (err) {
        if (err.message === "Dont have an access token") {
            res.status(401).json({ message: "Unauthorized" })
        }
        else if (err.type) {
            res.sendStatus(403)
        } else {
            res.status(500).json({ "message": err.message })
        }
    }
}

const updateCarbon = async (req, res) => {
    try {
        const { accountId } = req.params;
        const newCarbon = req.body;

        const carbonUpdated = await AccountService.updateCarbon(accountId, newCarbon, req);
        console.log("carbonUpdated", carbonUpdated);
        res.status(201).json({ carbonUpdated });
    } catch (err) {
        if (err.message === "Dont have an access token") {
            res.status(401).json({ message: "Unauthorized" });
        } else if (err.type) {
            res.sendStatus(403);
        } else {
            res.status(500).json({ "message": err.message });
        }
    }
}

export {
    createAccount,
    login,
    logout,
    updateAccount,
    getUsers,
    getUserById,
    deleteUser,
    getFavorites,
    getCarbon,
    getAchievements,
    getAchievementById,
    addToAchievements,
    removeFromAchievements,
    updateAchievements,
    removeAchievement,
    updateFavorites,
    removeFavorite,
    updateCarbon,
}

export default {
    createAccount,
    login,
    logout,
    updateAccount,
    getUsers,
    getUserById,
    deleteUser,
    getFavorites,
    getAchievementById,
    getCarbon,
    getAchievements,
    addToAchievements,
    removeFromAchievements,
    updateAchievements,
    removeAchievement,
    updateFavorites,
    removeFavorite,
    updateCarbon,
}
