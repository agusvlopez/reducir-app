import React from "react";
import ActionsForm from "./ActionsForm";

const ActionAdmin = () => {

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
        <h1>Administración</h1>
        <ActionsForm addAction={addAction} />
        </>
    )
}

export default ActionAdmin;