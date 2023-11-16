import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DietForm = () => {
  
  const [dietSelected, setDietSelected] = useState(''); // Estado para almacenar la opción seleccionada
  console.log(dietSelected);

  const handleChange = (e) => {
    setDietSelected(e.target.value);
    console.log(dietSelected);
    // Actualiza el estado cuando cambia la opción seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="options" className="block text-sm font-medium text-gray-700">
          ¿Cuál es tu tipo de dieta?
        </label>
        <select
          id="options"
          name="options"
          value={dietSelected}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="">Selecciona...</option>
          <option value="2,89">Vegana</option>
          <option value="3,81">Vegetariana</option>
          <option value="3,91">Piscívora</option>
          <option value="4,67">Baja en carne</option>
          <option value="5,63">Moderada en carne</option>
          <option value="7,19">Alta en carne</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        <div className="mt-4 flex justify-end">
          <Button type="submit">
            Siguiente pregunta
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DietForm;