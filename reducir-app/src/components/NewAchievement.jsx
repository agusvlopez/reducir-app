import React from "react";
import AchievementForm from "./AchievementForm";
import { useCreateAchievementPostMutation } from "../features/fetchFirebase";

const NewAchievement = () => {
    const accountId = localStorage.getItem('_id');
    const [createAchievementPost] = useCreateAchievementPostMutation();

    const addAchievement = async (achievementData) => {
        console.log("achievementData", achievementData);
        try {
            const result = await createAchievementPost(achievementData);
            // Aquí puedes hacer cualquier otra operación que necesites con la respuesta
        } catch (error) {
            console.error('Error creating achievement post:', error);
            // Maneja el error según sea necesario
        }
    };

    return (
        <>
            <div className="p-4 mb-8">
                <h2 className="text-center font-semibold mb-4">Agregar un post de Logro</h2>
                <AchievementForm addAchievement={addAchievement} />
            </div>
        </>
    )
}

export default NewAchievement;
