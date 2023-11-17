import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase.config';
import { useAuth } from '../context/authContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const TestForm = () => {
  //energia
  const [kwhSelected, setKwhSelected] = useState(''); // Estado para almacenar la opción seleccionada
  //transporte
  const [transportSelected, setTransportSelected] = useState(''); 
  console.log(kwhSelected);
  //diet
  const [dietSelected, setDietSelected] = useState(''); // Estado para almacenar la opción seleccionada
  console.log(dietSelected);

  const navigate = useNavigate();
  const auth = useAuth();
  console.log(auth.user.uid);
  const userId = auth.user.uid;

  const [carbon, setCarbon] = useState('');

  const sumaCarbon = parseInt(kwhSelected) + parseInt(dietSelected) + parseInt(transportSelected);
  console.log(sumaCarbon);
    // const dataKwh = {
    //     consumption: kwhSelected,
    //     location: 'LatinAmerica',
    // };
    // console.log(dataKwh);

  const handleChangeKwh = (e) => {
    setKwhSelected(e.target.value);
    console.log(kwhSelected);
    // Actualiza el estado cuando cambia la opción seleccionada
  };

  const handleChangeTransport = (e) => {
    setTransportSelected(e.target.value);
    console.log(transportSelected);
  }
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

  const handleChangeDiet = (e) => {
    setDietSelected(e.target.value);
    console.log(dietSelected);
    // Actualiza el estado cuando cambia la opción seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarbon(sumaCarbon);

    const userRef = doc(db, `users/${userId}`);
    console.log(userRef);
 
    try {
      // Actualiza el campo "carbon" del documento con el nuevo valor
      await updateDoc(userRef, { carbon: sumaCarbon });
      
      // Puedes agregar lógica adicional aquí si es necesario

      navigate("/perfil");
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
    }

  };

  console.log("energia:", kwhSelected);
  console.log("transporte: ", transportSelected);
  console.log("dieta:", dietSelected);
  console.log("carbon: ",carbon);
  return (
    <>
    <div className="rounded-t-[30px] backgroundWhite p-2 h-full">
      <div className="container mx-auto max-w-2xl p-4 h-screen">
        <form action="" onSubmit={handleSubmit}>
        <div>
        <label htmlFor="kwh" className="mb-2 block text-base font-medium text-gray-700">Vamos a calcular aproximadamente el consumo de kwh por el tamaño de tu vivienda.</label>
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

        <div>
          <label htmlFor="transport" className="mb-2 block text-base font-medium text-gray-700 ">¿Que transporte usas con más frecuencia en tu día a día?</label>
          <select 
          id="transport" 
          name="transport" 
          value={transportSelected} 
          onChange={handleChangeTransport}
          className="mt-1 block w-full p-2 border rounded-md mb-4"
          required
          >
            <option value="">Selecciona una opción...</option>
            <option value="6,3873">Auto</option>
            <option value="5,3097">Taxi</option>
            <option value="4,4958">Colectivo</option>
            <option value="2,2977">Tren</option>
            <option value="2,4462">Subte</option>
            <option value="3,8151">Moto</option>
            <option value="0">Bici</option>
            <option value="0">A pie</option>
          </select>
        </div>

        <div>
          <label htmlFor="diet" className="mb-2 block text-base font-medium text-gray-700 ">
              ¿Cuál es tu tipo de dieta?
            </label>
            <select
              id="diet"
              name="diet"
              value={dietSelected}
              onChange={handleChangeDiet}
              className="mt-1 block w-full p-2 border rounded-md mb-4"
              required
            >
              <option value="">Selecciona una opción...</option>
              <option value="2,89">Vegana</option>
              <option value="3,81">Vegetariana</option>
              <option value="3,91">Piscívora</option>
              <option value="4,67">Baja en carne</option>
              <option value="5,63">Moderada en carne</option>
              <option value="7,19">Alta en carne</option>
              {/* Agrega más opciones según sea necesario */}
            </select>
          </div>
          
          <p>La suma es: {carbon}</p>
          <Button 
          type='submit'
          className='text-base'
          >
          Enviar</Button>
        
        </form>
      </div>
    </div>
    </>
  );
};

export default TestForm;