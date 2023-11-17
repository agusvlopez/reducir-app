import React from "react";
import ActionsForm from "./ActionsForm";
import NavbarWeb from "../../components/NavbarWeb";
import Footer from "../../components/Footer";
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
        <div className="h-screen">
        <NavbarWeb></NavbarWeb>
        <div className="p-4  mb-8">
          <h1 className=" border-b-2 border-gray-500 pb-2 mb-4">Administración</h1>
          <ActionsForm addAction={addAction} />
        </div>
        <Footer />
        </div>
        </>
    )
}

export default ActionAdmin;