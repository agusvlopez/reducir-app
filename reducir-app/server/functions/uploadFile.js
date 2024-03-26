import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebase.js';

export async function uploadFile(file) {
    const fileRef = ref(storage, `images/${Date.now()}/${Date.now()}`);

    const fileMetadata = {
        contentType: file.mimetype
    };

    try {
        // Lee el contenido del archivo como un Buffer
        const fileBuffer = file.buffer;

        // Sube el archivo a Firebase Storage
        const uploadTask = uploadBytesResumable(fileRef, fileBuffer, fileMetadata);

        // Espera a que la tarea de carga se complete
        await uploadTask;

        // Obtiene la URL de descarga del archivo
        const fileDownloadURL = await getDownloadURL(fileRef);

        return { ref: fileRef, downloadURL: fileDownloadURL };
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        throw error;
    }
}

/**
 * Retorna la URL del archivo.
 * 
 * @param {File} path 
 * @returns {Promise<string>}
 */
export async function getFileURL(path) {
    return getDownloadURL(ref(storage, path));
}

/**
 * Edita la foto con el archivo proporcionado.
 * 
 * @param {File} image - Archivo de imagen a cargar.
 * @param {string} id - ID de la acción a la que pertenece la imagen.
 * @returns {Promise<string>} - URL de la imagen editada.
 */
export async function editPhoto(image, id) {
    const path = `images/${id}/${Date.now()}`;
    try {
        // Carga el archivo de imagen
        await uploadFile(image);
        // Obtiene la URL de descarga del archivo cargado
        const photoURL = await getFileURL(path);
        console.log('photoURL', photoURL);
        return photoURL;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
}
