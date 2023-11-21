import React, { useEffect, useState } from "react";
import NavbarWeb from "../../components/NavbarWeb";
import Footer from "../../components/Footer";
import ModalAction from "../../components/ModalAction.jsx";
import { Button, Card, CardBody, CardFooter, Image, Modal, Spinner, useDisclosure } from "@nextui-org/react";
import ModalDelete from "../../components/ModalDelete.jsx";
import MenuAdmin from "../../components/MenuAdmin.jsx";
import ModalActionDetail from "../../components/ModalActionDetail.jsx";
import AdminLayout from "./AdminLayout.jsx";

const ActionsAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);

  const updateData = (updatedItem) => {
    // Actualizar el estado con el nuevo item
    setData((prevData) => prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const deleteData = (itemId) => {
    setData((prevData) => prevData.filter((item) => item.id !== itemId));
  }

  const openModal = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const closeModal = () => {
    setSelectedItem(null);
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/reducir-app/us-central1/app/api/getAll');
        const result = await response.json();
        console.log(result);
        if(!result.empty){
          setData(result);
          setLoading(false);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 
    return (
        <>   
         <AdminLayout pageTitle="Administración">
          <h2 className="pb-2 mb-4">Todas las acciones</h2>
        {loading &&
          <div className="flex justify-center container p-4 mx-auto">
            <Spinner color="success" />
          </div>
        }
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 container mx-auto">
            {data.map((item) => (
              <Card shadow="sm" 
              key={item.id} 
              isPressable
              onPress={() => openModal(item)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.image}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between gap-2">
                  <b>{item.title}</b>
                  <div className="flex flex-col align-center gap-2">
                    <ModalAction item={item} updateData={updateData} />
                    <ModalDelete item={item} deleteData={deleteData} />
                    <ModalActionDetail item={item} isOpen={selectedItem === item} onClose={closeModal} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AdminLayout>
        </>
    )
}

export default ActionsAdmin;