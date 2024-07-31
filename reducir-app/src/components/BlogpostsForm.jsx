import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useGetAchievementQuery } from "../features/fetchFirebase";

const BlogpostsForm = (props) => {
    //const { accountId } = useParams();
    // const { achievementId } = useParams();
    // const achievement = {
    //     accountId: accountId,
    //     achievementId: achievementId
    // }

    const accountId = localStorage.getItem('_id');
    const accountEmail = localStorage.getItem('email');
    const [urlImg, setUrlImg] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    // console.log("achievementId", achievementId);
    // console.log("accountId", accountId);
    // console.log("achievementData", achievementData);
    // const achievementTitle = achievementData?.title;
    const validate = (value) => {
        return value ? "" : "Este campo es obligatorio.";
    };

    const initialStateValues = {
        title: "",
        achievement: "",
        description: "",
        image: "",
        email: accountEmail,
        accountId: accountId
    };
    console.log("initialStateValues", initialStateValues);
    const [values, setValues] = useState(initialStateValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update the achievement field before submitting
        const updatedValues = { ...values };
        console.log("updatedValues", updatedValues);
        props.addBlogpost(updatedValues);
        setSuccessMessage("¡El formulario se completó con éxito!");
        setTimeout(() => {
            setSuccessMessage("");
            navigate(`/blog`);
        }, 2000);
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
    }

    return (
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
            <div className="w-full mb-4">
                <label htmlFor="achievement" className="mb-2 text-sm"></label>
                <Textarea
                    type="text"
                    variant="faded"
                    label="Logro"
                    name="achievement"
                    value={values.achievement}
                    onChange={handleChange}
                    id="achievement"
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
    );
};

export default BlogpostsForm;
