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
const BlogpostCollection = db.collection('blogposts');

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

const getAllBlogposts = async (filter = {}) => {
    await client.connect();
    const validatedFilter = filterQueryToMongo(filter);

    return BlogpostCollection.find(validatedFilter).toArray();
}

const getBlogpostsByID = async (accountId) => {
    await client.connect();
    try {
        // Convierte el accountId a ObjectId
        const objectId = ObjectId.createFromHexString(accountId);

        // Encuentra todos los blogposts con el accountId especificado
        const blogposts = await BlogpostCollection.find({ accountId: objectId }).toArray();

        return blogposts;
    } catch (error) {
        console.error('Error al obtener los blogposts:', error);
        throw error;
    } finally {
        await client.close();
    }
};

const getBlogpostByPostID = async (blogpostId) => {
    await client.connect();
    return BlogpostCollection.findOne({ _id: ObjectId.createFromHexString(blogpostId) });
}

const createBlogpost = async (blogpost) => {
    await client.connect();
    try {
        console.log("blogpost", blogpost);
        // Convierte el accountId a ObjectId
        blogpost.accountId = ObjectId.createFromHexString(blogpost.accountId);

        // Inserta el nuevo producto en la base de datos y obtén el documento insertado
        const result = await BlogpostCollection.insertOne(blogpost);
        console.log('Blogpost creado exitosamente.');

        // Devuelve solo la información relevante del nuevo producto
        const newBlogpost = {
            _id: result.insertedId,
            title: blogpost.title,
            achievement: blogpost.achievement,
            description: blogpost.description,
            category: blogpost.category,
            image: blogpost.image,
            email: blogpost.email,
            accountId: blogpost.accountId
        };


        return newBlogpost;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw { code: 500, msg: 'Internal Server Error' };
    }
}

export {
    getAllBlogposts,
    createBlogpost,
    getBlogpostsByID,
    getBlogpostByPostID
}

export default {
    getAllBlogposts,
    createBlogpost,
    getBlogpostsByID,
    getBlogpostByPostID
}