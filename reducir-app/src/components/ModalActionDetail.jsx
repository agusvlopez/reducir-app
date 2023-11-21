import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ModalActionDetail({item}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque')
  // const [data, setData] = useState([]);
  
  const backdrops = ["Ver detalle"];
  console.log(item);

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/reducir-app/us-central1/app/api/get/${item.id}`);
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
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button  
            key={b}
            variant="flat" 
            color="default" 
            onPress={() => handleOpen(b)}
            className="capitalize"
          >
           {b}
          </Button>
        ))}  
      </div>
     
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
      
        <ModalContent>
          {(onClose) => (
            <>
            <ModalHeader className="flex flex-col gap-1">{item.title}</ModalHeader>
              <ModalBody>
                  <div>
                    <img src={item.image} alt={item.alt} 
                     className="z-10 shadow rounded-lg transition-transform-opacity motion-reduce:transition-none !duration-300  w-full object-cover h-[120px]"
                     />
                  </div>
                  <div className="pb-2">
                    <p><span className="font-semibold">Titulo:</span> {item.title}</p>
                    <p><span className="font-semibold">Categoría:</span> {item.category}</p>
                    <p><span className="font-semibold">Descripción:</span> {item.description}</p>
                    <p><span className="font-semibold">Tip:</span> {item.tip}</p>
                    <p><span className="font-semibold">Puntos:</span> {item.points}</p>
                    <p><span className="font-semibold">Carbono:</span> {item.carbon}</p>
                  </div>
              </ModalBody>             
            </>
          )}
        </ModalContent> 
      
      </Modal>
      
    </>
  );
}
