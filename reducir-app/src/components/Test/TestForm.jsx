import { Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { useUpdateCarbonMutation } from '../../features/fetchFirebase';
import { useNavigate } from 'react-router-dom';
import { TransportOption } from './TransportOption';
import { DietOption } from './DietOption';
import { DIET_OPTIONS, TRANSPORT_OPTIONS } from '../../constants/test';
import CustomButton from '../Base/CustomButton';

const TestForm = () => {
  const accountId = localStorage.getItem('_id');
  const navigate = useNavigate();
  const [updateCarbon] = useUpdateCarbonMutation();

  const [isLoading, setIsLoading] = useState(false);
  //energia
  const [kwhSelected, setKwhSelected] = useState(0);
  const [transportSelected, setTransportSelected] = useState(0);
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  //diet
  const [dietSelected, setDietSelected] = useState(0);
  const [dietId, selectedDietId] = useState(null);
  // const [carbon, setCarbon] = useState(0);
  // const sumaCarbon = parseInt(kwhSelected) + parseInt(dietSelected) + parseInt(transportSelected);

  const handleChangeKwh = (e) => {
    setKwhSelected(e.target.value);
  };

  const handleTransportClick = (selectedId, selectedValue) => {
    setSelectedTransportId(selectedId);
    setTransportSelected(selectedValue);

  };

  const handleDietClick = (selectedId, selectedValue) => {
    selectedDietId(selectedId);
    setDietSelected(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const sumaCarbon = parseFloat(kwhSelected) + parseFloat(dietSelected) + parseFloat(transportSelected);
    // setCarbon(sumaCarbon);

    const newCarbon = {
      accountId: accountId,
      carbon: sumaCarbon,
    };

    try {
      const result = await updateCarbon(newCarbon).unwrap();
      console.log("Result:", result);
      // setCarbon(sumaCarbon);
      //localStorage.setItem('carbon', sumaCarbon);
      navigate(`/perfil/${accountId}`);
    } catch (error) {
      console.error("Error updating carbon:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                {TRANSPORT_OPTIONS.map((option) => (
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

            <div className="mb-6">
              <label htmlFor="diet" className="mb-2 block text-base font-medium text-gray-700 ">
                ¿Cuál es tu tipo de dieta?
                {!dietSelected && (
                  <span className="text-red-500 text-lg pl-1">*</span>
                )}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {DIET_OPTIONS.map((option) => (
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

            <CustomButton
              variant="filled"
              type="submit"
              isOpacity={!kwhSelected || !transportSelected || !dietSelected}
              disabled={!kwhSelected || !transportSelected || !dietSelected}
              fullWidth
            >
              Enviar
            </CustomButton>

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