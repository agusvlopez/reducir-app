import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Account from "../model/Account.js";


// Cargar variables de entorno desde .env
dotenv.config();

// Obtener la URL de la base de datos desde las variables de entorno
const mongoURI = process.env.MONGODB_URI;

const client = new MongoClient('mongodb://127.0.0.1:27017');
//const client = new MongoClient(mongoURI);
const db = client.db("reducir_app");
const TokensCollection = db.collection('tokens');
const AccountsCollection = db.collection('accounts');

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

async function getAccounts(filter = {}) {
    await client.connect();

    const validatedFilter = filterQueryToMongo(filter);

    return AccountsCollection.find(validatedFilter).toArray();
}

async function createAccount(account) {
    await client.connect();

    const newAccount = {
        ...account,
        role: 'cliente'
    }

    const salt = await bcrypt.genSalt(10);

    newAccount.password = await bcrypt.hash(account.password, salt);

    await AccountsCollection.insertOne(newAccount);
    console.log("account", account);
    return {
        token: await createToken({ ...account, password: undefined, role: account.role })
    };
}

async function verifyAccount(account) {
    await client.connect();

    let accountData = await AccountsCollection.findOne({ email: account.email });

    if (!accountData) {
        throw { msg: "No se encontró el email en la base de datos" }
    }

    if (!await (bcrypt.compare(account.password, accountData.password))) {
        throw { msg: "El password es incorrecto" }
    };

    return { ...account, password: undefined, role: accountData.role };
}

async function createToken(payload) {
    const token = jwt.sign(payload, "CLAVE SECRETA");

    TokensCollection.insertOne({ token, email: payload.email, role: payload.role });
    console.log(token);
    return token;
}

async function createSession(account) {
    let accountData = await AccountsCollection.findOne({ email: account.email });
    console.log("accountData", accountData);
    if (!accountData) {
        throw new Error("Account not found");
    }
    return {
        account: {
            ...await verifyAccount(account),
            _id: accountData._id,
            carbon: accountData.carbon,
            favorites: accountData.favorites,
            achievements: accountData.achievements,
            role: accountData.role
        },
        token: await createToken({
            ...account,
            password: undefined,
            carbon: accountData.carbon,
            favorites: accountData.favorites,
            achievements: accountData.achievements,
            role: accountData.role
        })
    };
}


async function verifyToken(token) {
    await client.connect();

    const payload = jwt.verify(token, "CLAVE SECRETA");
    if (!await TokensCollection.findOne({ token })) {
        throw { msg: "El token no está en la base de datos." }
    }

    return payload;
}

async function deleteSession(token) {
    await client.connect();

    TokensCollection.deleteOne({ token });
}

async function getAccountByID(accountId) {
    await client.connect();
    // Validar el accountId antes de convertirlo a ObjectId
    if (!ObjectId.isValid(accountId)) {
        throw new Error('Invalid accountId format');
    }
    return AccountsCollection.findOne({ _id: ObjectId.createFromHexString(accountId) });
}

async function deleteAccountFromDatabase(accountId) {
    return await AccountsCollection.deleteOne({ _id: ObjectId.createFromHexString(accountId) });
}

async function deleteAccount(accountId) {
    try {
        //const action = await getAccountByID(accountId);

        const result = await deleteAccountFromDatabase(accountId);

        if (result.deletedCount === 0) {
            return { success: false, error: 'Account not found' };
        }

        return { success: true, message: 'Account deleted successfully' };
    } catch (error) {
        console.error('Error deleting Account:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}


async function getFavoritesByAccountId(accountId) {
    try {
        await client.connect();
        const account = await getAccountByID(accountId);

        const favorites = account.favorites;
        console.log(favorites);
        return favorites;

    } catch {

    }

};

async function updateAccount(accountId, accountData) {

    try {
        await client.connect();
        // Obtener el producto existente
        const oldAccount = await getAccountByID(accountId);

        // Crear el objeto de producto actualizado
        const updatedAccount = {
            _id: oldAccount._id,
            title: accountData.title || oldAccount.title,
            description: accountData.description || oldAccount.description,
            tip: accountData.tip || oldAccount.tip,
            image: accountData.image || oldAccount.image,
            alt: accountData.alt || oldAccount.alt,
            category: accountData.category || oldAccount.category,
            carbon: accountData.carbon || oldAccount.carbon,
            points: accountData.points || oldAccount.points,
        };

        //Si hay un nuevo archivo, actualizar la propiedad 'image' en 'updatedAction'
        // if (actionData.image) {
        //     updatedAccount.image = accountData.image;
        //     // Eliminar la imagen anterior si existe
        //     if (oldAccount.image) {
        //         await deleteImageFile(oldAccount.image);
        //         console.log('oldAccount.image', oldAccount.image);
        //     }
        // }

        // Actualizar el producto en la base de datos
        const result = await AccountsCollection.updateOne(
            { _id: ObjectId.createFromHexString(accountId) },
            { $set: updatedAccount }
        );

        console.log('Usuario antiguo:', oldAccount);
        console.log('Usuario actualizado:', updatedAccount);
        console.log('Resultado de la actualización:', result);

        if (result.matchedCount === 1) {
            console.log('Usuario editado exitosamente.');
            return AccountsCollection.findOne({ _id: ObjectId.createFromHexString(accountId) });
        }
    } catch (error) {
        console.error('Error actualizando el usuario:', error);
        throw { code: 500, msg: 'Internal Server Error servicio' };
    }
}

// async function addToFavorites(accountId, favorite) {
//     await client.connect();
//     const account = await getAccountByID(accountId);
//     const newFavorite = {
//         ...favorite
//     }

//     const favorites = account?.favorites || [];

//     favorites.push(newFavorite);
//     console.log("favorites", favorites);

//     const result = await AccountsCollection.updateOne(
//         { _id: ObjectId.createFromHexString(accountId) },
//         { $addToSet: { favorites: { $each: newFavorite } } }
//     );

//     return result;
// }

// async function addToFavorites(accountId, newFavorites) {
//     await client.connect();

//     // Validar si newFavorites es un array
//     if (!Array.isArray(newFavorites)) {
//         throw new Error('El campo favorites debe ser un array');
//     }

//     const result = await AccountsCollection.updateOne(
//         { _id: ObjectId.createFromHexString(accountId) },
//         { $addToSet: { favorites: { $each: newFavorites } } }
//     );

//     console.log("result", result);
//     if (result.modifiedCount > 0) {
//         const updatedAccount = await getAccountByID(accountId);
//         return updatedAccount.favorites;
//     } else {
//         throw new Error('Ya existe en favoritos');
//     }
// }

async function addToAchievements(accountId, newAchievement) {
    await client.connect();

    // Validar si newFavorites es un array
    if (!Array.isArray(newAchievement)) {
        throw new Error('El campo achievements debe ser un array');
    }

    const result = await AccountsCollection.updateOne(
        { _id: ObjectId.createFromHexString(accountId) },
        { $addToSet: { achievements: { $each: newAchievement } } }
    );

    if (result.modifiedCount > 0) {
        const updatedAccount = await getAccountByID(accountId);
        return updatedAccount.achievements;
    } else {
        throw new Error('Ya existe en logros');
    }
}

// async function removeFromFavorites(accountId, favoriteToRemove) {
//     await client.connect();

//     const favorite = { favorites: favoriteToRemove };

//     if (typeof favorite !== 'string' && (typeof favorite !== 'object' || favorite === null)) {
//         throw new Error('El campo favorite debe ser un string o un objeto no nulo');
//     }

//     const result = await AccountsCollection.updateOne(
//         { _id: ObjectId.createFromHexString(accountId) },
//         { $pull: favorite }
//     );

//     if (result.modifiedCount > 0) {
//         const updatedAccount = await getAccountByID(accountId);
//         return updatedAccount.favorites;
//     } else {
//         throw new Error('Usuario no encontrado o el favorito no existe');
//     }
// }

// const removeAchievement = async (accountId, achievementId) => {
//     try {
//         const account = await getAccountByID(accountId);
//         if (!account) {
//             throw new Error('Cuenta no encontrada');
//         }

//         // Filtra el array de favoritos para eliminar el favorito con el _id dado
//         let achievementsUpdated = account.achievements.filter(favorite => favorite._id.toString() !== achievementId);

//         const result = await AccountsCollection.updateOne(
//             { _id: ObjectId.createFromHexString(accountId) },
//             { $pull: { achievements: achievementsUpdated } }
//         );


//         return result;
//     } catch (error) {
//         throw new Error('Error al eliminar el logro');
//     }
// };

async function removeFromAchievements(accountId, achievementToRemove) {
    await client.connect();

    const achievement = { achievements: achievementToRemove };

    if (typeof achievement !== 'string' && (typeof achievement !== 'object' || achievement === null)) {
        throw new Error('El campo achievement debe ser un string o un objeto no nulo');
    }

    const result = await AccountsCollection.updateOne(
        { _id: ObjectId.createFromHexString(accountId) },
        { $pull: achievement }
    );

    if (result.modifiedCount > 0) {
        const updatedAccount = await getAccountByID(accountId);
        return updatedAccount.achievements;
    } else {
        throw new Error('Usuario no encontrado o el logro no existe');
    }
}

const getCarbonByAccountId = async (accountId) => {
    try {
        await client.connect();
        const account = await getAccountByID(accountId);


        console.log("account", account);
        const carbon = account.carbon;
        console.log(carbon);
        return carbon;

    } catch {

    }

};

const getAchievementsByAccountId = async (accountId) => {
    try {
        await client.connect();
        const account = await getAccountByID(accountId);

        const achievements = account.achievements;
        return achievements;

    } catch {

    }
};

const getAchievementById = async (accountId, achievementId) => {
    try {
        await client.connect();
        console.log("entre", accountId, achievementId);
        const account = await getAccountByID(accountId);
        console.log("account", account);
        const achievements = account.achievements;
        console.log("achievements", achievements);

        const achievement = achievements.find(achievement => achievement._id.toString() === achievementId.toString());
        console.log("achievement", achievement);
        return achievement;

    } catch (error) {
        console.log(error);
    }
}

const updateAchievements = async (id, newAchievement, req) => {
    try {
        // Verificar si newAchievement tiene un _id definido y es válido
        if (!newAchievement._id || !ObjectId.isValid(newAchievement._id)) {
            throw new Error("Invalid achievement _id");
        }
        console.log("newAchievement", newAchievement);
        // Realizo la reserva si no hubo error al verificar el accessToken.
        const accountId = ObjectId.createFromHexString(id);
        const filter = { _id: accountId };

        // Obtener el documento de la cuenta
        const account = await Account.findOne(filter);
        if (!account) {
            throw new Error("Account not found");
        }

        // Verificar si el favorito ya existe en el array
        const achievementExists = account.achievements.some(a => a._id.toString() === newAchievement._id);
        if (achievementExists) {
            throw new Error("Achievement already exists");
        }

        // Si no existe, agregar el nuevo favorito
        const updateAchievement = {
            $push: {
                achievements: {
                    _id: ObjectId.createFromHexString(newAchievement._id),
                    ...newAchievement
                },
            },
        };
        console.log("updateAchievement", updateAchievement);
        const updateOne = await Account.updateOne(filter, updateAchievement);
        return updateOne;

    } catch (error) {
        throw error;
    }
}

const removeAchievement = async (id, achievementId) => {
    try {
        const accountId = ObjectId.createFromHexString(id);
        const filter = { _id: accountId };
        const achievementObjectId = ObjectId.createFromHexString(achievementId);

        const updateAchievement = {
            $pull: {
                achievements: { _id: achievementObjectId }
            },
        };

        const updateOne = await Account.updateOne(filter, updateAchievement);
        return updateOne;

    } catch (error) {
        throw error;
    }
}

const updateFavorites = async (id, newFavorite, req) => {
    try {
        // Verificar si newFavorite tiene un _id definido y es válido
        if (!newFavorite._id || !ObjectId.isValid(newFavorite._id)) {
            throw new Error("Invalid favorite _id");
        }
        console.log("newFavorite", newFavorite);
        // Realizo la reserva si no hubo error al verificar el accessToken.
        const accountId = ObjectId.createFromHexString(id);
        const filter = { _id: accountId };

        // Obtener el documento de la cuenta
        const account = await Account.findOne(filter);
        if (!account) {
            throw new Error("Account not found");
        }

        // Verificar si el favorito ya existe en el array
        const favoriteExists = account.favorites.some(favorite => favorite._id.toString() === newFavorite._id);
        if (favoriteExists) {
            throw new Error("Favorite already exists");
        }

        // Si no existe, agregar el nuevo favorito
        const updateFavorite = {
            $push: {
                favorites: {
                    _id: ObjectId.createFromHexString(newFavorite._id),
                    ...newFavorite
                },
            },
        };
        console.log("updateFavorite", updateFavorite);
        const updateOne = await Account.updateOne(filter, updateFavorite);
        return updateOne;

    } catch (error) {
        throw error;
    }
}

const removeFavorite = async (id, favoriteId) => {
    try {
        const accountId = ObjectId.createFromHexString(id);
        const filter = { _id: accountId };
        const favoriteObjectId = ObjectId.createFromHexString(favoriteId);

        const updateFavorite = {
            $pull: {
                favorites: { _id: favoriteObjectId }
            },
        };

        const updateOne = await Account.updateOne(filter, updateFavorite);
        return updateOne;

    } catch (error) {
        throw error;
    }
}

const updateCarbon = async (id, newCarbon, req) => {
    try {
        console.log("newCarbon", newCarbon);
        // Verificar si newAchievement tiene un _id definido y es válido
        if (!id) {
            throw new Error("Invalid id");
        }
        console.log("newCarbon", newCarbon);
        // Realizo la reserva si no hubo error al verificar el accessToken.
        const accountId = ObjectId.createFromHexString(id);
        const filter = { _id: accountId };

        // Obtener el documento de la cuenta
        const account = await Account.findOne(filter);
        if (!account) {
            throw new Error("Account not found");
        }

        const updateCarbon = {
            $set: {
                carbon: newCarbon.carbon
            },
        };
        console.log("updateAchievement", updateCarbon);
        const updateOne = await Account.updateOne(filter, updateCarbon);
        console.log("updateOne", updateOne);
        return updateOne;

    } catch (error) {
        throw error;
    }
}

export {
    createAccount,
    createSession,
    verifyToken,
    deleteSession,
    getAccounts,
    getAccountByID,
    updateAccount,
    deleteAccount,
    getFavoritesByAccountId,
    addToAchievements,
    getCarbonByAccountId,
    getAchievementsByAccountId,
    getAchievementById,
    removeFromAchievements,
    updateAchievements,
    removeAchievement,
    updateFavorites,
    removeFavorite,
    updateCarbon
}

export default {
    createAccount,
    createSession,
    verifyToken,
    deleteSession,
    getAccounts,
    getAccountByID,
    updateAccount,
    deleteAccount,
    getFavoritesByAccountId,
    addToAchievements,
    getCarbonByAccountId,
    getAchievementsByAccountId,
    getAchievementById,
    removeFromAchievements,
    updateAchievements,
    removeAchievement,
    updateFavorites,
    removeFavorite,
    updateCarbon
}