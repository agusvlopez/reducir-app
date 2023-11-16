import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TransportForm = () => {
    let resultTransport;
  const [transportSelected, setTransportSelected] = useState(''); // Estado para almacenar la opción seleccionada
    const [carbonTransport, setCarbonTransport] = useState('');
  const data = {
    distance: 20,
    type: transportSelected,
  };

  const handleChange = (e) => {
    setTransportSelected(e.target.value);
    console.log(transportSelected);
    // Actualiza el estado cuando cambia la opción seleccionada
  };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://tracker-for-carbon-footprint-api.p.rapidapi.com/publicTransit', {
        method: 'POST',
        headers: {
            "content-type": "application/json;charset=utf-8",
            'X-RapidAPI-Key': '13c3932d76msh7d89591544a64bep15b4f2jsn856c9deb359c',
            'X-RapidAPI-Host': 'tracker-for-carbon-footprint-api.p.rapidapi.com'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al realizar el POST');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result.carbon);
      if(result.success){
        console.log("llegue al success");
        setCarbonTransport(result.carbon);
      }else {
        console.log("llegue al else");
        setCarbonTransport(0)
      }
      

      // Puedes manejar la respuesta del servidor según tus necesidades
    } catch (error) {
      console.error('Error al realizar el POST:', error);
    } 
  };

  console.log(carbonTransport);
  return (
    <div>
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="options">¿Que transporte usas con más frecuencia para desplazarte?</label>
      <select id="options" name="options" value={transportSelected} onChange={handleChange}>
        <option value="">Selecciona...</option>
        <option value="Coach">Auto</option>
        <option value="Taxi">Taxi</option>
        <option value="ClassicBus">Colectivo</option>
        <option value="LightRail">Tren</option>
        <option value="Subway">Subte</option>
        <option value="bike">Bici</option>
        <option value="foot">A pie</option>
        {/* Agrega más opciones según sea necesario */}
      </select>
      <Button type='submit'>Siguiente pregunta</Button>
      <p>Opción seleccionada: {transportSelected}</p>
    </form>
    </div>
  );
};

export default TransportForm;