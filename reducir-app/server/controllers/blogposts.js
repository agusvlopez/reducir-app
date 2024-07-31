import * as BlogpostsService from "../services/blogposts.js";
import { editPhoto, uploadFile } from '../functions/uploadFile.js';

const getAllBlogposts = (req, res) => {
    BlogpostsService.getAllBlogposts(req.query)
        .then(function (actions) {
            res.status(200).json(actions);
        })
        .catch(function (err) {
            res.status(500).json({ msg: "No se encuentran los posteos." });
        })
}

function getBlogpostsByID(req, res) {
    //obtengo el valor a traves de los params, puede ser de las dos siguientes formas:
    //const idProduct = req.params.idProduct;
    const { accountId } = req.params;

    BlogpostsService.getBlogpostsByID(accountId)
        .then(function (blogposts) {
            return res.status(200).json(blogposts)
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

const createBlogpost = async (req, res) => {
    try {
        const { body } = req;

        // Llamar al servicio para crear el producto con la URL de descarga de la imagen
        const blogpost = await BlogpostsService.createBlogpost(body);

        res.status(201).json(blogpost); // Cambiado a 201 para indicar la creación exitosa
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getBlogpostByPostID = async (req, res) => {
    const { blogpostId } = req.params;

    BlogpostsService.getBlogpostByPostID(blogpostId)
        .then(function (blogposts) {
            return res.status(200).json(blogposts)
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ msg: err.msg });
            }
            else {
                res.status(500).json({ msg: "No se pudo obtener el post" });
            }
        })
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