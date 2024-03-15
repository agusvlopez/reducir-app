import * as ActionsService from "../services/actions.js";
import { uploadFile } from '../functions/uploadFile.js';

function getActions(req, res) {

    ActionsService.getActions(req.query)
        .then(function (actions) {
            res.status(200).json(actions);
        })
        .catch(function (err) {
            res.status(500).json({ msg: "No se encuentra el archivo" });
        })
}

function getActionByID(req, res) {
    //obtengo el valor a traves de los params, puede ser de las dos siguientes formas:
    //const idProduct = req.params.idProduct;
    const { actionId } = req.params;

    ActionsService.getActionByID(actionId)
        .then(function (action) {
            return res.status(200).json(action)
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

async function createAction(req, res) {
    try {
        const { body, image } = req;

        // // Verificar si se cargó un archivo de imagen
        // if (!image) {
        //     return res.status(400).json({ error: 'No image provided' });
        // }

        // // Llamar al servicio para subir la imagen a Firebase Storage
        // const { downloadURL } = await uploadFile(image);

        // Llamar al servicio para crear el producto con la URL de descarga de la imagen
        const action = await ActionsService.createAction(body);

        res.status(201).json(action); // Cambiado a 201 para indicar la creación exitosa
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
