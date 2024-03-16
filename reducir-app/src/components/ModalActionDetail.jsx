import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useParams } from "react-router-dom";

export default function ModalActionDetail({ item, isOpen, onClose }) {
  const { idAccion: actionId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2023/actions/${actionId}`);
        console.log(response);
        const result = await response.json();
        console.log(result);
        if (!result.empty) {
          setData(result);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
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
        </ModalContent>
      </Modal>

    </>
  );
}
