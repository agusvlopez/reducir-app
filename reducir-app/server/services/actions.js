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
    //await client.connect();

    const validatedFilter = filterQueryToMongo(filter);

    return ActionCollection.find(validatedFilter).toArray();
}

async function getActionByID(actionId) {
    // await client.connect();
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

async function deleteActionFromDatabase(actionId) {
    return await ActionCollection.deleteOne({ _id: ObjectId.createFromHexString(actionId) });
}

async function deleteImageFile(imagePath) {
    try {
        const fileRef = ref(storage, imagePath);
        console.log(imagePath);
        await deleteObject(fileRef);

        console.log('Image file deleted successfully.');
    } catch (err) {
        console.error('Error deleting image file:', err);
        throw err;
    }
}

async function deleteAction(actionId) {
    try {
        const action = await getActionByID(actionId);

        const result = await deleteActionFromDatabase(actionId);

        if (result.deletedCount === 0) {
            return { success: false, error: 'Product not found' };
        }

        const imagePath = action.image;
        if (imagePath) {
            deleteImageFile(imagePath);
        }

        return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}

export const updateAccount = async (accountId, accountData) => {
    try {
        // Obtener la cuenta existente
        const oldAccountData = await AccountRepository.getAccount(accountId);
        if (!oldAccountData) {
            throw new Error('Account not found');
        }

        // Crear el objeto de cuenta actualizada
        let updatedAccount = {
            name: accountData.name || oldAccountData.name,
            email: accountData.email || oldAccountData.email,
        };

        // Hash de la nueva contraseña si se proporciona
        if (accountData.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(accountData.password, salt);
            updatedAccount.password = hashedPassword;
        } else {
            // Mantener la contraseña actual si no se proporciona una nueva
            updatedAccount.password = oldAccountData.password;
        }

        // Actualizar la cuenta en la base de datos
        const result = await AccountRepository.updateAccount(accountId, updatedAccount);
        console.log('Cuenta antigua:', oldAccountData);
        console.log('Cuenta actualizada:', updatedAccount);
        console.log('Resultado de la actualización:', result);

        if (result.count > 0) { // Verifica que se haya actualizado al menos una fila
            // Obtener la cuenta actualizada para devolverla
            const updatedAccountData = await AccountRepository.getAccount(accountId);
            return updatedAccountData; // Devolver el objeto actualizado
        } else {
            throw new Error('Failed to update account');
        }
    } catch (error) {
        console.error('Error actualizando la cuenta:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
};
export {
    getActions,
    createAction,
    getActionByID,
    deleteAction,

}

export default {
    getActions,
    createAction,
    getActionByID,
    deleteAction,

}
