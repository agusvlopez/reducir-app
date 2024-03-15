import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
// Cargar variables de entorno desde .env
dotenv.config();

// Obtener la URL de la base de datos desde las variables de entorno
const mongoURI = process.env.MONGODB_URI;

//const client = new MongoClient('mongodb://127.0.0.1:27017');
const client = new MongoClient(mongoURI);
const db = client.db("reducir-app");
const ActionCollection = db.collection('actions');

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

async function getActions(filter = {}) {
    await client.connect();

    const validatedFilter = filterQueryToMongo(filter);

    return ActionCollection.find(validatedFilter).toArray();
}

async function getActionByID(actionId) {
    await client.connect();
    return ActionCollection.findOne({ _id: ObjectId.createFromHexString(actionId) });
}

async function createAction(action) {
    try {
        // Inserta el nuevo producto en la base de datos y obtén el documento insertado
        const result = await ActionCollection.insertOne(action);

        // Devuelve solo la información relevante del nuevo producto
        const newAction = {
            _id: result.insertedId,
            title: action.title,
            description: action.description,
            points: action.points,
            tip: action.tip,
            category: action.category,
            image: action.image,
            alt: action.alt,
            carbon: action.carbon,
        };

        console.log('Producto creado exitosamente.');

        return newAction;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
}

export {
    getActions,
    createAction,
    getActionByID
}

export default {
    getActions,
    createAction,
    getActionByID
}
