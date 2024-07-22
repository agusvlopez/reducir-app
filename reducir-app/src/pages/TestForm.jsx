import { Button, Spinner } from '@nextui-org/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase.config';
import { useAuth } from '../context/authContext';
import { doc, updateDoc } from 'firebase/firestore';
import bike from "../covers/icons/bike-icon.png";
import car from "../covers/icons/car-icon.png";
import train from "../covers/icons/train-icon.png";
import bus from "../covers/icons/bus-icon.png";
import subway from "../covers/icons/subway-icon.png";
import walk from "../covers/icons/walk-icon.png";
import motorbike from "../covers/icons/motorbike-icon.png";
import taxi from "../covers/icons/taxi-icon.png";
import { useCreateCarbonMutation, useGetCarbonQuery, useGetUserQuery, useUpdateCarbonMutation } from '../features/fetchFirebase';

const options = [
  { id: 1, label: "Bici", imageUrl: bike, value: 0 },
  { id: 2, label: 'Auto', imageUrl: car, value: 7 },
  { id: 3, label: 'Taxi', imageUrl: taxi, value: 6 },
  { id: 4, label: 'Colectivo', imageUrl: bus, value: 5 },
  { id: 5, label: 'Tren', imageUrl: train, value: 2 },
  { id: 6, label: 'Subte', imageUrl: subway, value: 3 },
  { id: 7, label: 'Moto', imageUrl: motorbike, value: 4 },
  { id: 8, label: 'A pie', imageUrl: walk, value: 0 },
];

const dietOptions = [
  { id: 1, label: "Vegana", value: 3 },
  { id: 2, label: 'Vegetariana', value: 4 },
  { id: 3, label: 'Piscívora', value: 4 },
  { id: 4, label: 'Baja en carne', value: 5 },
  { id: 5, label: 'Moderada en carne', value: 6 },
  { id: 6, label: 'Alta en carne', value: 8 }
];

const TransportOption = ({ id, label, imageUrl, value, selected, onClick }) => (
  <div
    key={id}
    onClick={() => onClick(id, value)}
    className={`cursor-pointer border rounded-xl p-4 font-semibold ${selected ? 'borderGreen' : 'border-gray-300 bg-white'}`}
  >
    <div className="flex items-center flex-col">
      <img src={imageUrl} alt={label} className="mb-2 h-18 w-18 object-contain" />
      <p className="text-center">{label}</p>
    </div>
  </div>
);

const DietOption = ({ id, label, value, selected, onClick }) => (
  <div
    key={id}
    onClick={() => onClick(id, value)}
    className={`cursor-pointer border rounded-xl p-4 flex justify-center items-center ${selected ? 'borderGreen text-white backgroundDarkGreen font-semibold' : 'border-gray-300 bg-white'}`}
  >
    <p className={`text-center ${selected ? ' text-white' : ''}`}>{label}</p>
  </div>
);

const TestForm = () => {
  const accountId = localStorage.getItem('_id');
  const navigate = useNavigate();
  // const auth = useAuth();
  // const userId = auth.user.uid;
  //const [createCarbon] = useCreateCarbonMutation();
  const [updateCarbon] = useUpdateCarbonMutation();
  const { data: carbonData, isLoading: carbonLoading, isError: carbonError } = useGetCarbonQuery(accountId);
  const { data: accountData, isLoading: accountIsLoading, isError: accountIsError } = useGetUserQuery(accountId);
  console.log("carbonData", carbonData);
  console.log("accountData", accountData);
  const [isLoading, setIsLoading] = useState(false);
  //energia
  const [kwhSelected, setKwhSelected] = useState(0);
  const [transportSelected, setTransportSelected] = useState(0);
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  //diet
  const [dietSelected, setDietSelected] = useState(0);
  const [dietId, selectedDietId] = useState(null);
  const [carbon, setCarbon] = useState(0);
  const sumaCarbon = parseInt(kwhSelected) + parseInt(dietSelected) + parseInt(transportSelected);

  const handleChangeKwh = (e) => {
    setKwhSelected(e.target.value);
    console.log(kwhSelected);
  };

  const handleTransportClick = (selectedId, selectedValue) => {
    setSelectedTransportId(selectedId);
    setTransportSelected(selectedValue === 0 ? null : selectedValue);
  };

  const handleDietClick = (selectedId, selectedValue) => {
    selectedDietId(selectedId);
    setDietSelected(selectedValue === 0 ? null : selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const sumaCarbon = parseFloat(kwhSelected) + parseFloat(dietSelected) + parseFloat(transportSelected);
    setCarbon(sumaCarbon);

    const newCarbon = {
      accountId: accountId,
      carbon: sumaCarbon,
    };
    console.log("newCarbon", newCarbon);
    try {
      const result = await updateCarbon(newCarbon).unwrap();
      console.log("Result:", result);
      setCarbon(sumaCarbon);
      navigate(`/perfil/${accountId}`);
    } catch (error) {
      console.error("Error updating carbon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   setIsLoading(true);
  //   e.preventDefault();
  //   setCarbon(parseInt(kwhSelected) + parseInt(dietSelected) + parseInt(transportSelected));


  //   //const userRef = doc(db, `users/${accountId}`);
  //   // console.log(userRef);
  //   const newCarbon = {
  //     accountId: accountId,
  //     carbon: carbon,
  //   }


  //   //console.log("newCarbonValue", newCarbonValue);
  //   await createCarbon(newCarbon);
  //   // console.log("newCarbon", newCarbon);
  //   // if (newCarbon) {
  //   //   try {
  //   //     // await updateDoc(userRef, { carbon: sumaCarbon });
  //   //     const result = await createCarbon(newCarbon);
  //   //     console.log("despues del try", carbonData, accountData);
  //   //     console.log("result", result);
  //   //     console.log("accountId", accountId);
  //   //     console.log("sumaCarbon", sumaCarbon);
  //   //     setIsLoading(false);
  //   //     navigate(`/perfil/${accountId}`);
  //   //     setCarbon(sumaCarbon);
  //   //   } catch (err) {
  //   //     console.log("err", err);
  //   //   }
  //   // }
  // };

  return (
    <>
      <div className="rounded-t-[30px] backgroundWhite p-2">
        <div className="container mx-auto max-w-2xl p-4">
          <form action="" onSubmit={handleSubmit}>
            <p className="mb-2"><span className="text-lg">(*)</span> Indica un campo obligatorio.</p>
            <div className="mb-6">
              <label htmlFor="kwh" className="mb-2 block text-lg font-medium text-gray-700">Vamos a calcular aproximadamente el consumo de kwh según el tamaño de tu vivienda.
                {!kwhSelected && (
                  <span className="text-red-500 text-lg pl-1">*</span>
                )}
              </label>
              <select
                id="kwh"
                name="kwh"
                value={kwhSelected}
                onChange={handleChangeKwh}
                className="mt-1 block w-full p-2 border rounded-md mb-4"
                required
              >
                <option value="">Selecciona una opción...</option>
                <option value={36}>Monoambiente/Departamento chico</option>
                <option value={59}>Casa chica (1-2 habitaciones)</option>
                <option value={107}>Casa mediana (3-4 habitaciones)</option>
                <option value={166}>Casa grande (más de 4 habitaciones)</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="transport" className="mb-2 block font-medium text-gray-700 text-lg ">
                ¿Qué transporte usas con más frecuencia en tu día a día?
                {!transportSelected && (
                  <span className="text-red-500 text-lg pl-1">*</span>
                )}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {options.map((option) => (
                  <TransportOption
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    imageUrl={option.imageUrl}
                    value={option.value}
                    selected={selectedTransportId === option.id}
                    onClick={handleTransportClick}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="diet" className="mb-2 block text-base font-medium text-gray-700 ">
                ¿Cuál es tu tipo de dieta?
                {!dietSelected && (
                  <span className="text-red-500 text-lg pl-1">*</span>
                )}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dietOptions.map((option) => (
                  <DietOption
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    value={option.value}
                    selected={dietId === option.id}
                    onClick={handleDietClick}
                  />
                ))}
              </div>
            </div>
            <Button
              type='submit'
              className={`text-base mt-4 backgroundDarkGreen text-white ${!kwhSelected || !transportSelected || !dietSelected ? 'opacity-70' : ''}`}
              disabled={!kwhSelected || !transportSelected || !dietSelected}
            >
              Enviar</Button>
            {isLoading &&
              <div className="inline-block ml-2 pt-4">
                <Spinner color="success" size='sm' />
              </div>
            }
          </form>
          <p
            className={`text-sm mt-4 ${!kwhSelected || !transportSelected || !dietSelected ? 'block' : 'hidden'}`}
          > Faltan seleccionar campos.</p>
        </div>
      </div>
    </>
  );
};

export default TestForm;