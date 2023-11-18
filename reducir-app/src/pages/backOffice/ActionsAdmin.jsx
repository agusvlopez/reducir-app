import React, { useEffect, useState } from "react";
import NavbarWeb from "../../components/NavbarWeb";
import Footer from "../../components/Footer";
import ModalAction from "../../components/ModalAction.jsx";
import { Card, CardBody, CardFooter, Image, Modal, Spinner } from "@nextui-org/react";
import ModalDelete from "../../components/ModalDelete.jsx";
import MenuAdmin from "../../components/MenuAdmin.jsx";

const ActionsAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateData = (updatedItem) => {
    // Actualizar el estado con el nuevo item
    setData((prevData) => prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const deleteData = (itemId) => {
    setData((prevData) => prevData.filter((item) => item.id !== itemId));
  }

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

  if (loading) {
    return (
    <>
    <div className="flex justify-center container p-4 mx-auto">
      <Spinner color="success" />
    </div>
    </>
    )
  }
  
    return (
        <>
        
        <div className="h-screen">
        <NavbarWeb></NavbarWeb>
        <div className="p-4 mb-8">
        <h1 className=" border-b-2 border-gray-500 pb-2 mb-4">Administración</h1>
          <MenuAdmin></MenuAdmin>
          <h2 className="pb-2 mb-4">Todas las acciones</h2>

          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 container mx-auto">
            {data.map((item) => (
              <Card shadow="sm" 
              key={item.id} 
              isPressable onPress={() => console.log("item pressed")}
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
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
        </div>
        
        </>
    )
}

export default ActionsAdmin;