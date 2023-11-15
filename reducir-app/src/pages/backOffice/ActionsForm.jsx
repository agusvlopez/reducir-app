import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";

const ActionsForm = (props) => {

    const initialStateValues = 
    {
        title: "",
        description: "",
        image: "",
        category: "",
        carbon: "",
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

    };


    return (
        <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-6 md:mb-0 gap-4">
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              label="Título"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              label="Descripción"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              label="Imagen URL"
              name="image"
              value={values.image}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 md:mb-0 gap-4">
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              variant="faded"
              label="Categoría"
              name="category"
              value={values.category}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2">
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
        <Button type="submit" variant="primary">
          Enviar
        </Button>
      </form>
    )
}

export default ActionsForm;