import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ActionsForm = (props) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = (value) => {
    // Lógica de validación para el campo title
    return value ? "" : "Este campo es obligatorio.";
  };

    const initialStateValues = 
    {
        title: "",
        description: "",
        tip: "",
        image: "",
        alt: "",
        category: "",
        carbon: "",
        points: "",
    };

    const [values, setValues] = useState(initialStateValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value);
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      props.addAction(values);
      navigate("/admin/acciones");

    };

    return (
      <>
        <form onSubmit={handleSubmit} className="my-form container">
        <div className="w-full mb-4">
            <Input
              type="text"
              variant="faded"
              label="Título"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={() => setErrors({ ...errors, title: validate(values.title) })}
              required
            />
        </div>
        <div className="w-full mb-4">
            <Textarea
              type="text"
              variant="faded"
              label="Descripción"
              name="description"
              value={values.description}
              onChange={handleChange}
              required
            />
        </div>
        <div className="w-full mb-4">
            <Textarea
              type="text"
              variant="faded"
              label="Tip"
              name="tip"
              value={values.tip}
              onChange={handleChange}
              required
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="w-full">
            <Input
              type="text"
              variant="faded"
              label="Imagen URL"
              name="image"
              value={values.image}
              onChange={handleChange}
              required
            />
          </div>        
          <div className="w-full ">
            <Input
              type="text"
              variant="faded"
              label="Alt de la imagen"
              name="alt"
              value={values.alt}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="w-full ">
            <Input
              type="text"
              variant="faded"
              label="Categoría"
              name="category"
              value={values.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <Input
              type="number"
              variant="faded"
              label="Carbono"
              name="carbon"
              value={values.carbon}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full mb-4">
            <Input
              type="number"
              variant="faded"
              label="Puntos"
              name="points"
              value={values.points}
              onChange={handleChange}
              required
            />
          </div>
        <div className="flex justify-center">
          <Button 
          type="submit" 
          className={`backgroundDarkGreen text-white w-2/5 ${!values.title || !values.description || !values.tip || !values.image || !values.alt || !values.category || !values.carbon || !values.points ? 'opacity-70' : ''}`}
          disabled={!values.title || !values.description || !values.tip || !values.image || !values.alt || !values.category || !values.carbon || !values.points} 
          >
            Enviar
          </Button>
        </div>
        <p 
          className={`text-sm mt-4  ${!values.title || !values.description || !values.tip || !values.image || !values.alt || !values.category || !values.carbon || !values.points ? 'block' : 'none'}`}
        > Faltan completar campos.</p>
      </form>
    </>
    )
}

export default ActionsForm;