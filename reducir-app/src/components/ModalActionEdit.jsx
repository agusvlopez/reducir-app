import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { storage } from "../firebase/firebase.config";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ModalActionEdit({ item, updateData }) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque')
  const [data, setData] = useState([]);
  
  const backdrops = ["Editar"];
  console.log(item);

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }

  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    tip: item.tip,
    image: item.image,
    alt: item.alt,
    category: item.category,
    carbon: item.carbon,
    points: item.points,
    id: item.id,
  });


// console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    // Función para obtener el nombre del archivo desde la URL
    const getFileNameFromUrl = (url) => {
      try {
        // Decodifica la URL y obtén la última parte después de '/'
        const decodedUrl = decodeURIComponent(url);
        const urlParts = decodedUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
    
        // Verifica si la última parte es un token válido
        if (fileName.includes('?alt=media&token=')) {
          console.log(fileName);
          return fileName;
        } else {
          console.error('La URL no tiene el formato esperado:', url);
          return null;
        }
      } catch (error) {
        console.error('Error al obtener el nombre del archivo desde la URL:', error);
        return null;
      }
    };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  
    // Elimina la imagen existente si existe
    if (formData.image) {
      try {
        const existingImageRef = ref(storage, `images/${getFileNameFromUrl(formData.image)}`);
        console.log(existingImageRef);
        if(existingImageRef){
          await getDownloadURL(existingImageRef); // Verifica si la URL es válida
          await deleteObject(existingImageRef);
        console.log('Imagen existente eliminada con éxito');
        }

      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          console.log('La imagen no existe en Storage. Continuando...');
        } else {
          console.error('Error al eliminar la imagen existente:', error);
          return;
        }
      }
    }
  
    // Sube la nueva imagen
    const refFile = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(refFile, file);
      const imageUrl = await getDownloadURL(refFile);

      setFormData((prevValues) => ({
        ...prevValues,
        image: imageUrl,
      }));
    } catch (error) {
      console.error('Error al subir la nueva imagen:', error);
    }
  };


  const handleUpdateAction = async (e) => {
    e.preventDefault();
    try {
      // Aquí deberías realizar la lógica para enviar la solicitud PUT
      const response = await fetch(`http://127.0.0.1:5001/reducir-app/us-central1/app/api/update/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      console.log(formData, "despues del fetch");
      onClose(); // Cierra el modal después de la actualización
      // Manejo de la respuesta, por ejemplo:
      if (response.ok) {
        updateData(formData);
        console.log('Actualización exitosa:', formData);
      } else {
        console.error('Error al actualizar');
      }
      
    } catch (error) {
      console.error('Error al realizar la actualización:', error);
    }
  };
  
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button  
            key={b}
            variant="flat" 
            color="warning" 
            onPress={() => handleOpen(b)}
            className="capitalize"
          >
           {b}
          </Button>
        ))}  
      </div>
     
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleUpdateAction}>
        <ModalContent>
          {(onClose) => (
            <>           
              <ModalHeader className="flex flex-col gap-1">Editar acción: "{formData.title}"</ModalHeader>
              <ModalBody>
              <div className="flex">
                <div>
                <label htmlFor="title" className="font-semibold">Título:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                <label htmlFor="category" className="font-semibold">Categoría:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label htmlFor="description" className="font-semibold">Descripción:</label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />

              <label htmlFor="tip" className="font-semibold">Tip:</label>
                <textarea
                  type="text"
                  id="tip"
                  name="tip"
                  value={formData.tip}
                  onChange={handleChange}
                />

              <label htmlFor="image" className="font-semibold">Imagen</label>
                <input
                  id="file"
                  type="file" 
                  name="image"
                  //value={formData.image}
                  onChange={handleImageChange}
                />

              <label htmlFor="alt" className="font-semibold">Alt de la imagen:</label>
                <input
                  type="text"
                  id="alt"
                  name="alt"
                  value={formData.alt}
                  onChange={handleChange}
                />

              <div className="flex">
              <div>
              <label htmlFor="carbon" className="font-semibold">Carbono:</label>
                <input
                  type="number"
                  id="carbon"
                  name="carbon"
                  value={formData.carbon}
                  onChange={handleChange}
                />
              </div>
              <div>
              <label htmlFor="points" className="font-semibold">Puntos:</label>
                <input
                  type="number"
                  id="points"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                />
              </div>
              </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button 
                className="backgroundDarkGreen text-white"
                color="default" type="submit">
                  Editar
                </Button>
              </ModalFooter> 
             
            </>
          )}
        </ModalContent> 
        </form>
      </Modal>
      
    </>
  );
}
