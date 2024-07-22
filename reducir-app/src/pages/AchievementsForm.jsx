import { useParams } from "react-router-dom";
import "../index.css";
import { useGetAchievementQuery } from "../features/fetchFirebase";
import { useState } from "react";
import { Button } from "@nextui-org/react";

export function AchievementsForm() {
    const { accountId } = useParams();
    const { achievementId } = useParams();
    const achievement = {
        accountId: accountId,
        achievementId: achievementId
    }
    const { data, isLoading, isError } = useGetAchievementQuery(achievement);
    console.log("data", data?.achievement);
    const defaultTitle = `¡Logré incorporar la acción ${data?.achievement?.title} a mis hábitos!`;
    const [title, setTitle] = useState(defaultTitle);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [achievementTitle, setAchievementTitle] = useState(data?.achievement?.title);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);

        try {
            const response = await fetch('/ruta/para/subir', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log(result);
            // Manejar la respuesta del servidor
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="backgroundDarkGreen shadow-md">
                <div className="container p-6 mx-auto text-white">
                    <h1 className="mb-2">Compartir logro "{data?.achievement?.title}"</h1>
                    <div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div>
                                <label htmlFor="title">Título:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    required
                                    className="text-black"
                                />
                            </div>
                            <div>
                                <label htmlFor="title">Logro:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data?.achievement?.title}
                                    defaultValue={data?.achievement?.title || ''}
                                    className="text-black"
                                />
                            </div>
                            <div>
                                <label htmlFor="content">Contenido:</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={content}
                                    onChange={handleContentChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Imagen:</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>
                            <div>
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Vista previa de la imagen"
                                        style={{ maxWidth: '200px' }}
                                    />
                                )}
                            </div>
                            <div>
                                <Button
                                    type='submit'
                                    className={`text-base mt-4 backgroundOrange text-white`}
                                >
                                    Subir Publicación</Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )


}