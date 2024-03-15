import React from "react";
import ActionsForm from "./ActionsForm";
import AdminLayout from "./AdminLayout";

const NewActionAdmin = () => {

  const addAction = async (actionData) => {
    try {
      const response = await fetch('http://localhost:2023/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create action');
      }

      const data = await response.json();
      console.log('Action created:', data);
      // Aquí puedes hacer cualquier otra operación que necesites con la respuesta
    } catch (error) {
      console.error('Error creating action:', error);
      // Maneja el error según sea necesario
    }
  };

  return (
    <>
      <AdminLayout pageTitle="Administración">
        <div className="p-4  mb-8">
          <h2 className="text-center font-semibold mb-4">Agregar una acción</h2>
          <ActionsForm addAction={addAction} />
        </div>
      </AdminLayout>
    </>
  )
}

export default NewActionAdmin;