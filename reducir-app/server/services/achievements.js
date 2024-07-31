import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import { storage } from '../firebase/firebase.js';
import { deleteObject, ref } from 'firebase/storage';
// Cargar variables de entorno desde .env
dotenv.config();

// Obtener la URL de la base de datos desde las variables de entorno
const mongoURI = process.env.MONGODB_URI;

const client = new MongoClient('mongodb://127.0.0.1:27017');
//const client = new MongoClient(mongoURI);
const db = client.db("reducir_app");
const AchievementsCollection = db.collection('achievements');


function filterQueryToMongo(filter) {
    const filterMongo = {};

    for (const filed in filter) {
        if (isNaN(filter[filed])) {
            filterMongo[filed] = filter[filed];
        }
        else {
            const [field, op] = filed.split('_');

            if (!op) {
                filterMongo[filed] = parseInt(filter[filed]);
            }
            else {
                if (op === 'min') {
                    filterMongo[field] = {
                        $gte: parseInt(filter[filed])
                    }
                }
                else if (op === 'max') {
                    filterMongo[field] = {
                        $lte: parseInt(filter[filed])
                    }
                }
            }

        }

    }

    return filterMongo;

}

async function getAchievements(filter = {}) {
    await client.connect();

    const validatedFilter = filterQueryToMongo(filter);

    return AchievementsCollection.find(validatedFilter).toArray();
}

const createAchievement = async (achievement) => {
    await client.connect();
    try {
        console.log("achievement", achievement);
        // Convierte el accountId a ObjectId
        achievement.accountId = ObjectId.createFromHexString(achievement.accountId);

        // Inserta el nuevo producto en la base de datos y obtén el documento insertado
        const result = await AchievementsCollection.insertOne(achievement);
        console.log('Achievement creado exitosamente.');

        // Devuelve solo la información relevante del nuevo producto
        const newAchievement = {
            _id: result.insertedId,
            title: achievement.title,
            achievement: achievement.achievement,
            description: achievement.description,
            image: achievement.image,
            email: achievement.email,
            accountId: achievement.accountId
        };


        return newAchievement;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
}

const getAchievementByPostID = async (achievementId) => {
    await client.connect();
    try {
        // Convierte el accountId a ObjectId
        const objectId = ObjectId.createFromHexString(achievementId);

        // Encuentra todos los blogposts con el accountId especificado
        const achievementPost = await AchievementsCollection.find({ _id: objectId }).toArray();

        return achievementPost;
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    } finally {
        await client.close();
    }
};

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
