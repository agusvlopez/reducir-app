import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ModalDelete({ item, deleteData }) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque')
  // const [data, setData] = useState([]);

  const backdrops = ["Eliminar"];
  console.log(item);

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }

  // console.log(formData);
  const handleDeleteAction = async (e) => {
    e.preventDefault();
    try {
      // Aquí deberías realizar la lógica para enviar la solicitud PUT
      const response = await fetch(`http://localhost:2023/actions/${item._id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      console.log(response, "despues del fetch");
      // Cierra el modal después de la actualización
      // Manejo de la respuesta, por ejemplo:
      if (response.ok) {
        deleteData(item._id);
        console.log('Actualización exitosa');
      } else {
        console.error('Error al eliminar', item._id);
      }
      onClose();

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
            color="danger"
            onPress={() => handleOpen(b)}
            className="capitalize"
          >
            {b}
          </Button>
        ))}
      </div>

      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleDeleteAction}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{item.title}</ModalHeader>
                <ModalBody>
                  <p>Titulo: {item.title}</p>
                  <p>Categoría: {item.category}</p>
                </ModalBody>
                <ModalFooter>
                  <p>¿Confirma eliminación?</p>
                  <Button color="danger" type="submit">
                    Eliminar
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
