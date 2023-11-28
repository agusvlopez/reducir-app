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

const options = [
  { id: 1, label: "Bici", imageUrl: bike, value: "0" },
  { id: 2, label: 'Auto', imageUrl: car, value: '6,3873' },
  { id: 3, label: 'Taxi', imageUrl: taxi, value: '5,3097' },
  { id: 4, label: 'Colectivo', imageUrl: bus, value: '4,4958' },
  { id: 5, label: 'Tren', imageUrl: train, value: '2,2977' },
  { id: 6, label: 'Subte', imageUrl: subway, value: '2,4462' },
  { id: 7, label: 'Moto', imageUrl: motorbike, value: '3,8151' },
  { id: 8, label: 'A pie', imageUrl: walk, value: '0' },
];

const dietOptions = [
  { id: 1, label: "Vegana", value: "2,89" },
  { id: 2, label: 'Vegetariana', value: '3,81' },
  { id: 3, label: 'Piscívora', value: '3,91' },
  { id: 4, label: 'Baja en carne', value: '4,67' },
  { id: 5, label: 'Moderada en carne', value: '5,63' },
  { id: 6, label: 'Alta en carne', value: '7,19' }
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
  
  const navigate = useNavigate();
  const auth = useAuth();
  const userId = auth.user.uid;
  
  const [isLoading, setIsLoading] = useState(false);
  //energia
  const [kwhSelected, setKwhSelected] = useState('');
  const [transportSelected, setTransportSelected] = useState(''); 
  const [selectedTransportId, setSelectedTransportId] = useState(null); 
  //diet
  const [dietSelected, setDietSelected] = useState('');
  const [dietId, selectedDietId] = useState(null); 

  const [carbon, setCarbon] = useState('');

  const sumaCarbon = parseInt(kwhSelected) + parseInt(dietSelected) + parseInt(transportSelected);
  console.log(sumaCarbon);

  const handleChangeKwh = (e) => {
    setKwhSelected(e.target.value);
    console.log(kwhSelected);
  };

  const handleTransportClick = (selectedId, selectedValue) => {
    setSelectedTransportId(selectedId);
    setTransportSelected(selectedValue === '' ? null : selectedValue);
  };

  const handleDietClick = (selectedId, selectedValue) => {
    selectedDietId(selectedId);
    setDietSelected(selectedValue === '' ? null : selectedValue);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setCarbon(sumaCarbon);

    const userRef = doc(db, `users/${userId}`);
    console.log(userRef);
 
    try {
      await updateDoc(userRef, { carbon: sumaCarbon });
      setIsLoading(false);
      navigate("/perfil");
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
    }
};

  return (
    <>
    <div className="rounded-t-[30px] backgroundWhite p-2">
      <div className="container mx-auto max-w-2xl p-4">
        <form action="" onSubmit={handleSubmit}>
          <p className="mb-2"><span className="text-lg">(*)</span> Indica un campo obligatorio.</p>
        <div className="mb-6">
        <label htmlFor="kwh" className="mb-2 block text-lg font-medium text-gray-700">Vamos a calcular aproximadamente el consumo de kwh por el tamaño de tu vivienda.
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
            <option value="35,43">Monoambiente/Departamento chico</option>
            <option value="59,05">Casa chica (1-2 habitaciones)</option>
            <option value="106,29">Casa mediana (3-4 habitaciones)</option>
            <option value="165,34">Casa grande (más de 4 habitaciones)</option>
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
          className={`text-sm mt-4 ${!kwhSelected || !transportSelected || !dietSelected ? 'block' : 'none'}`}
        > Faltan seleccionar campos.</p>
      </div>
    </div>
    </>
  );
};

export default TestForm;