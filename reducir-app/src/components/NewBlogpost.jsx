import React from "react";
import BlogpostsForm from "./BlogpostsForm";
import { useCreateBlogpostMutation } from "../features/fetchFirebase";

const NewBlogpost = () => {
    const accountId = localStorage.getItem('_id');
    const [createBlogpost] = useCreateBlogpostMutation();

    const addBlogpost = async (blogpostData) => {
        console.log("blogpostData", blogpostData);
        try {
            const result = await createBlogpost(blogpostData);
            // const response = await fetch(`http://localhost:2023/blogposts`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(blogpostData),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to create a blogpost');
            // }

            // const data = await response.json();
            // console.log('Blogpost created:', data);
            // Aquí puedes hacer cualquier otra operación que necesites con la respuesta
        } catch (error) {
            console.error('Error creating blogpost:', error);
            // Maneja el error según sea necesario
        }
    };

    return (
        <>
            <div className="p-4 mb-8">
                <h2 className="text-center font-semibold mb-4">Agregar un post</h2>
                <BlogpostsForm addBlogpost={addBlogpost} />
            </div>
        </>
    )
}

export default NewBlogpost;
