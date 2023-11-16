import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EnergyForm = () => {
  
    const [kwhSelected, setKwhSelected] = useState(''); // Estado para almacenar la opción seleccionada
    const [carbonEnergy, setCarbonEnergy] = useState('');
    console.log(kwhSelected);
    const dataKwh = {
        consumption: kwhSelected,
        location: 'LatinAmerica',
    };
    console.log(dataKwh);

    const handleChange = (e) => {
    setKwhSelected(e.target.value);
    console.log(kwhSelected);
    // Actualiza el estado cuando cambia la opción seleccionada
  };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/traditionalHydro', {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '13c3932d76msh7d89591544a64bep15b4f2jsn856c9deb359c',
            'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
        },
        body: JSON.stringify(dataKwh),
      });

      if (!response.ok) {
        throw new Error('Error al realizar el POST');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

        setCarbonEnergy(result.carbon);

      

      // Puedes manejar la respuesta del servidor según tus necesidades
    } catch (error) {
      console.error('Error al realizar el POST:', error);
    } 
  };

  console.log(carbonEnergy);
  return (
    <div>
    <form action="" onSubmit={handleSubmit}>
    <label htmlFor="options">Vamos a calcular aproximadamente el consumo de kwh por el tamaño de tu vivienda.</label>
      <select id="options" name="options" value={kwhSelected} onChange={handleChange}>
        <option value="">Selecciona...</option>
        <option value="150">Monoambiente/Departamento chico</option>
        <option value="250">Casa chica (1-2 habitaciones)</option>
        <option value="450">Casa mediana (3-4 habitaciones)</option>
        <option value="750">Casa grande (más de 4 habitaciones)</option>
        {/* Agrega más opciones según sea necesario */}
      </select>
      <Button type='submit'>Siguiente pregunta</Button>
      <p>Opción seleccionada: {kwhSelected}</p>
    </form>
    </div>
  );
};

export default EnergyForm;