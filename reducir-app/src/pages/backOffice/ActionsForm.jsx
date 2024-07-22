import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage, db } from "../../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ActionsForm = (props) => {
  const [urlImg, setUrlImg] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
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

    props.addAction({
      ...values
    });

    setSuccessMessage("¡El formulario se completó con éxito!");
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/admin/acciones");
    }, 2000);

  };

  const fileHandler = async (e) => {
    const file = e.target.files[0];
    //cargamos la imagen al storage:
    const refFile = ref(storage, `images/${Date.now()}/${Date.now()}`);
    await uploadBytes(refFile, file);
    //obtenemos la url de la imagen de storage:
    const imageUrl = await getDownloadURL(refFile);
    setUrlImg(imageUrl);
    console.log(imageUrl);
    // Actualizamos el valor del campo de imagen en el estado del formulario
    setValues((prevValues) => ({
      ...prevValues,
      image: imageUrl,
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="my-form container">
        <div className="w-full mb-4">
          <label htmlFor="title" className="mb-2 text-sm"></label>
          <Input
            type="text"
            variant="faded"
            label="Título"
            name="title"
            id="title"
            value={values.title}
            onChange={handleChange}
            onBlur={() => setErrors({ ...errors, title: validate(values.title) })}
            required
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="description" className="mb-2 text-sm"></label>
          <Textarea
            type="text"
            variant="faded"
            label="Descripción"
            name="description"
            id="description"
            value={values.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="tip" className="mb-2 text-sm"></label>
          <Textarea
            type="text"
            variant="faded"
            label="Tip"
            name="tip"
            id="tip"
            value={values.tip}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="image" className="mb-2 text-sm"></label>
            <Input
              id="image"
              type="file"
              variant="faded"
              label="Imagen"
              name="image"
              onChange={fileHandler}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="alt" className="mb-2 text-sm"></label>
            <Input
              type="text"
              variant="faded"
              label="Alt de la imagen"
              name="alt"
              id="alt"
              value={values.alt}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="category" className="mb-2 text-sm"></label>
            <Input
              id="category"
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
            <label htmlFor="carbon" className="mb-2 text-sm"></label>
            <Input
              id="carbon"
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
          <label htmlFor="points" className="mb-2 text-sm"></label>
          <Input
            id="points"
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
            className={`backgroundDarkGreen text-white w-2/5 ${!values.title || !values.description || !values.tip || !values.alt || !values.category || !values.carbon || !values.points ? 'opacity-70' : ''}`}
            disabled={!values.title || !values.description || !values.tip || !values.alt || !values.category || !values.carbon || !values.points}
          >
            Enviar
          </Button>
        </div>
        <p
          className={`text-sm mt-4  ${!values.title || !values.description || !values.tip || !values.alt || !values.category || !values.carbon || !values.points ? 'block' : 'none'}`}
        > Faltan completar campos.
        </p>
        <p
          className={`text-sm mt-4 text-green-500 ${successMessage ? "block" : "hidden"
            }`}
        >
          {successMessage}
        </p>
      </form>
    </>
  )
}

export default ActionsForm;