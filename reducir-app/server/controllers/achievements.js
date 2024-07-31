import * as AchievementsCollection from "../services/achievements.js";
import { editPhoto, uploadFile } from '../functions/uploadFile.js';

const getAchievements = (req, res) => {
    AchievementsCollection.getAchievements(req.query)
        .then(function (actions) {
            res.status(200).json(actions);
        })
        .catch(function (err) {
            res.status(500).json({ msg: "No se encuentran los posteos." });
        })
}

function getAchievementByPostID(req, res) {
    //obtengo el valor a traves de los params, puede ser de las dos siguientes formas:
    //const idProduct = req.params.idProduct;
    const { achievementId } = req.params;

    AchievementsCollection.getAchievementByPostID(achievementId)
        .then(function (achievementPost) {
            return res.status(200).json(achievementPost)
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ msg: err.msg });
            }
            else {
                res.status(500).json({ msg: "No se pudo obtener el archivo" });
            }
        })
}

const createAchievement = async (req, res) => {
    try {
        const { body } = req;

        // Llamar al servicio para crear el producto con la URL de descarga de la imagen
        const achievement = await AchievementsCollection.createAchievement(body);

        res.status(201).json(achievement); // Cambiado a 201 para indicar la creación exitosa
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// const getBlogpostByPostID = async (req, res) => {
//     const { blogpostId } = req.params;

//     BlogpostsService.getBlogpostByPostID(blogpostId)
//         .then(function (blogposts) {
//             return res.status(200).json(blogposts)
//         })
//         .catch(function (err) {
//             if (err?.code) {
//                 res.status(err.code).json({ msg: err.msg });
//             }
//             else {
//                 res.status(500).json({ msg: "No se pudo obtener el post" });
//             }
//         })
// }

export {
    getAchievements,
    createAchievement,
    getAchievementByPostID
}

export default {
    getAchievements,
    createAchievement,
    getAchievementByPostID
}