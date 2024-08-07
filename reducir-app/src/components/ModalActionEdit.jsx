import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { storage } from "../firebase/firebase.config";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ModalActionEdit({ item, updateData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque')
  const [file, setFile] = useState(null);
  const [keepImage, setKeepImage] = useState(true);
  const backdrops = ["Editar"];
  const [formDataUpdated, setFormDataUpdated] = useState([]);
  const size = '2xl';

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tip: "",
    alt: "",
    category: "",
    carbon: "",
    points: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const fileInput = e.target;
    const newFile = fileInput.files[0];

    console.log("New File:", newFile);

    if (newFile) {
      setFile(newFile);
      setKeepImage(false);
    }

    //cargamos la imagen al storage:
    // const refFile = ref(storage, `images/${Date.now()}/${Date.now()}`);
    // await uploadBytes(refFile, newFile);
    // //obtenemos la url de la imagen de storage:
    // const imageUrl = await getDownloadURL(refFile);
    // console.log(imageUrl);
    // // Actualizamos el valor del campo de imagen en el estado del formulario
    // setFormData((prevValues) => ({
    //   ...prevValues,
    //   image: imageUrl,
    // }));
  };


  const handleUpdateAction = async (e) => {
    e.preventDefault();
    const formDataForUpdate = new FormData();
    formDataForUpdate.append('title', formData.title);
    formDataForUpdate.append('description', formData.description);
    formDataForUpdate.append('tip', formData.tip);
    formDataForUpdate.append('alt', formData.alt);
    formDataForUpdate.append('category', formData.category);
    formDataForUpdate.append('carbon', formData.carbon);
    formDataForUpdate.append('points', formData.points);

    if (file) {
      formDataForUpdate.append('image', file);
    }

    console.log("FILE:", formData.image);
    console.log("NEW FILE:", file);
    try {
      // Aquí deberías realizar la lógica para enviar la solicitud PUT
      const response = await fetch(`http://localhost:2023/actions/${item._id}`, {
        method: 'PUT',
        body: formDataForUpdate,
      });
      console.log(formDataForUpdate, "despues del fetch");
      // Manejo de la respuesta, por ejemplo:
      if (response.ok) {
        const updatedItem = await response.json(); // Asegúrate de obtener el ítem actualizado desde la respuesta
        updateData(updatedItem); // Pasar el ítem actualizado a updateData
        console.log('Actualización exitosa:', updatedItem);
      } else {
        console.error('Error al actualizar');
      }
      onClose(); // Cierra el modal después de la actualización

    } catch (error) {
      console.error('Error al realizar la actualización:', error);
    }
  };

  useEffect(() => {
    if (item) {
      setFormData(item);
      if (item.image) {
        setKeepImage(true);
      }
    }
  }, [item, formDataUpdated]);

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

      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
      >
        <form onSubmit={handleUpdateAction}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Editar acción: "{formData.title}"</ModalHeader>
                <ModalBody>
                  <div className="md:flex md:gap-4">
                    <div className="">
                      <label htmlFor="title" className="font-semibold">Título:</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full border p-2 rounded-md"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="category" className="font-semibold">Categoría:</label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        className="w-full border p-2 rounded-md"
                        value={formData.category}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="font-semibold">Descripción:</label>
                    <textarea
                      className="w-full h-[100px] border p-2 rounded-md"
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="tip" className="font-semibold">Tip:</label>
                    <textarea
                      type="text"
                      id="tip"
                      name="tip"
                      className="w-full border p-2 rounded-md"
                      value={formData.tip}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:flex md:gap-4">
                    <div className="flex-1">
                      <label htmlFor="image" className="font-semibold">Imagen</label>
                      <input
                        id="image"
                        type="file"
                        name="image"
                        required={!keepImage}
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="alt" className="font-semibold">Alt de la imagen:</label>
                      <input
                        type="text"
                        id="alt"
                        name="alt"
                        className="w-full border p-2 rounded-md"
                        value={formData.alt}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:gap-4">
                    <div className="flex-1">
                      <label htmlFor="carbon" className="font-semibold">Carbono:</label>
                      <input
                        type="number"
                        id="carbon"
                        name="carbon"
                        className="w-full border p-2 rounded-md"
                        value={formData.carbon}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="points" className="font-semibold">Puntos:</label>
                      <input
                        type="number"
                        id="points"
                        name="points"
                        className="w-full border p-2 rounded-md"
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
