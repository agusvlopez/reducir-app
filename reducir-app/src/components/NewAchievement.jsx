import React from "react";
import AchievementForm from "./AchievementForm";

const NewAchievement = () => {
    const accountId = localStorage.getItem('_id');

    const addAchievement = async (achievementData) => {
        console.log("achievementData", achievementData);
        try {
            const response = await fetch(`http://localhost:2023/achievements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(achievementData),
            });

            if (!response.ok) {
                throw new Error('Failed to create a blogpost');
            }

            const data = await response.json();
            console.log('Achievement post created:', data);
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
