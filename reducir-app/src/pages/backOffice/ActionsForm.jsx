import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

const ActionsForm = (props) => {

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
     
      props.addAction(values);

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
            />
          </div>
        <div className="flex justify-center">
          <Button type="submit" className="backgroundDarkGreen text-white w-2/5">
            Enviar
          </Button>
        </div>
      </form>
    </>
    )
}

export default ActionsForm;