import React from "react";
import ActionsForm from "./ActionsForm";
import NavbarWeb from "../../components/NavbarWeb";
import Footer from "../../components/Footer";
import NewActionAdmin from "./NewActionAdmin";
import MenuAdmin from "../../components/MenuAdmin";

const Admin = () => {

    
    return (
        <>
        <div className="h-screen">
        <NavbarWeb></NavbarWeb>
        <div className="p-4  mb-8">
          <h1 className=" border-b-2 border-gray-500 pb-2 mb-4">Administración</h1>
          <MenuAdmin></MenuAdmin>
            <NewActionAdmin></NewActionAdmin>
        </div>
        <Footer />
        </div>
        </>
    )
}

export default Admin;