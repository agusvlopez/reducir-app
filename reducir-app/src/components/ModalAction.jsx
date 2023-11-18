import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ModalAction({ item, updateData }) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque')
  // const [data, setData] = useState([]);
  
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
        console.log('Actualización exitosa');
      } else {
        console.error('Error al actualizar');
      }

      
    } catch (error) {
      console.error('Error al realizar la actualización:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
              <div className="flex">
                <div>
                <label htmlFor="title">Título:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                <label htmlFor="category">Categoría:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label htmlFor="description">Descripción:</label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />

              <label htmlFor="tip">Tip:</label>
                <textarea
                  type="text"
                  id="tip"
                  name="tip"
                  value={formData.tip}
                  onChange={handleChange}
                />

              <label htmlFor="image">Imagen URL:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />

              <label htmlFor="alt">Alt de la imagen:</label>
                <input
                  type="text"
                  id="alt"
                  name="alt"
                  value={formData.alt}
                  onChange={handleChange}
                />

              <div className="flex">
              <div>
              <label htmlFor="carbon">Carbono:</label>
                <input
                  type="number"
                  id="carbon"
                  name="carbon"
                  value={formData.carbon}
                  onChange={handleChange}
                />
              </div>
              <div>
              <label htmlFor="points">Puntos:</label>
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
                <Button color="primary" type="submit">
                  Guardar
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
