import * as ActionsService from "../services/actions.js";
import { editPhoto, uploadFile } from '../functions/uploadFile.js';

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
        const { body } = req;

        // Llamar al servicio para crear el producto con la URL de descarga de la imagen
        const action = await ActionsService.createAction(body);

        res.status(201).json(action); // Cambiado a 201 para indicar la creación exitosa
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteAction(req, res) {
    try {
        const { actionId } = req.params;

        // Lógica para eliminar el producto con el actionId
        const result = await ActionsService.deleteAction(actionId);

        if (result.deletedCount == 0) {
            return res.status(404).json({ error: 'Action not found' });
        }

        res.status(200).json({ message: 'Action deleted successfully' });
    } catch (error) {
        console.error('Error deleting action:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateAction(req, res) {
    try {
        const { actionId } = req.params;
        const { body, file } = req;

        // Verificar si hay un nuevo archivo adjunto
        if (!file) {
            // Si no hay un nuevo archivo, solo actualizar la información del producto sin cargar un nuevo archivo
            const updatedAction = await ActionsService.updateAction(actionId, body);
            console.log("No se ha adjuntado ninguna imagen");
            return res.status(200).json(updatedAction);
        }

        // Si hay un nuevo archivo, cargar el archivo y luego actualizar la información del producto
        const { downloadURL } = await uploadFile(file);
        const updatedActionData = { ...body, image: downloadURL };
        const updatedAction = await ActionsService.updateAction(actionId, updatedActionData);

        console.log('Acción actualizada con éxito:', updatedAction);
        return res.status(200).json(updatedAction);
    } catch (error) {
        console.error('Error al actualizar la acción:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export {
    getActions,
    createAction,
    getActionByID,
    deleteAction,
    updateAction
}

export default {
    getActions,
    createAction,
    getActionByID,
    deleteAction,
    updateAction
}
