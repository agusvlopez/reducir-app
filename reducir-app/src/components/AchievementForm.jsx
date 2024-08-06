import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCreateCarbonMutation, useGetAchievementQuery, useGetActionQuery, useGetCarbonQuery } from "../features/fetchFirebase";

const AchievementForm = (props) => {
    const { accountId } = useParams();
    const { actionId } = useParams();

    const categories = [
        { id: 1, name: 'agua' },
        { id: 2, name: 'reciclaje' },
        { id: 3, name: 'energía' },
        { id: 4, name: 'todas' }
    ];
    const accountEmail = localStorage.getItem('email');
    const [urlImg, setUrlImg] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const { data: actionData, isLoading: actionDataIsLoading, isError: actionDataIsError } = useGetActionQuery(actionId);
    const { data: carbonData, isLoading: carbonLoading, isError: carbonError } = useGetCarbonQuery(accountId);
    const [createCarbon] = useCreateCarbonMutation();
    const achievementTitle = actionData?.title;

    const validate = (value) => {
        return value ? "" : "Este campo es obligatorio.";
    };

    const initialStateValues = {
        title: "",
        achievement: "",
        description: "",
        category: "",
        image: "",
        email: accountEmail,
        accountId: accountId
    };
    const [values, setValues] = useState(initialStateValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSelectChange = (selectedCategory) => {
        setValues((prevValues) => ({ ...prevValues, category: selectedCategory }));
    };

    const fileHandler = async (e) => {
        const file = e.target.files[0];
        const refFile = ref(storage, `images/${Date.now()}/${Date.now()}`);
        await uploadBytes(refFile, file);
        const imageUrl = await getDownloadURL(refFile);
        setUrlImg(imageUrl);
        setValues((prevValues) => ({
            ...prevValues,
            image: imageUrl,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedValues = { ...values, achievement: actionData?.title || "" };

        await props.addAchievement(updatedValues);
        setSuccessMessage("¡El formulario se completó con éxito!");
        const newCarbonValue = carbonData?.carbon - actionData?.carbon;

        const newCarbon = {
            accountId,
            carbon: {
                carbon: newCarbonValue
            }
        };

        if (newCarbonValue) {
            const result = await createCarbon(newCarbon);
            console.log("Result of createCarbon:", result);
        }
        setTimeout(() => {
            setSuccessMessage("Success");
            navigate(`/perfil/${accountId}`);
        }, 2000);
    };

    return (
        actionData?.title ? (
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
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="flex w-1/2">
                        <Select
                            label="Categoría"
                            placeholder="Seleccionar una categoría"
                            className="w-full"
                            value={values.category}
                            onChange={(e) => handleSelectChange(e.target.value)}
                        >
                            {categories.map((category) => (
                                <SelectItem key={category.name} value={category.name}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="w-1/2 flex flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            key="md"
                            radious="md"
                            type="file"
                            label="Imagen"
                            labelPlacement="inside"
                            onChange={fileHandler}
                            required
                        />
                    </div>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="achievement" className="mb-2 text-sm"></label>
                    <Textarea
                        type="text"
                        variant="faded"
                        label="Logro"
                        name="achievement"
                        id="achievement"
                        value={achievementTitle}
                        readOnly
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
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        className={`backgroundDarkGreen text-white w-2/5 ${!values.title || !values.description ? 'opacity-70' : ''}`}
                        disabled={!values.title || !values.description}
                    >
                        Enviar
                    </Button>
                </div>
                {(!values.title || !values.description) && (
                    <p className="text-sm mt-4 text-red-500">Faltan completar campos.</p>
                )}
                {successMessage && (
                    <p className="text-sm mt-4 text-green-500">
                        {successMessage}
                    </p>
                )}
            </form>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default AchievementForm;
