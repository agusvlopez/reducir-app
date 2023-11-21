import React from "react";
import ActionsForm from "./ActionsForm";
import AdminLayout from "./AdminLayout";

const NewActionAdmin = () => {

        const addAction = async (linkObjet) => {
            console.log(linkObjet);
            try {
              let config = {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(linkObjet)
              }      
              let res = await fetch('http://127.0.0.1:5001/reducir-app/us-central1/app/api/create', config);
              let data = await res.json()
      
              console.log(data);
            }
      
            catch(error){
      
            }
        }
    
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