import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import {Menu} from "./Menu";
import {Chip} from "@nextui-org/react";
import HorizontalCard from "./HorizontalCard";
import NavbarWeb from "./NavbarWeb";
import ItemListContainer from "./ItemListContainer";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


export function Actions () {
   
    // const auth = useAuth();
    // console.log(auth);
    // const userId = auth.user.uid;
    
    // const navigate = useNavigate();  
    //ARREGLAR CON UNA FUNCION DE FIREBASE CREO, PARA esperara a que me lance que el usuario esta autenticado
    //  useEffect(()=> {
          
    //       if(!auth.user.uid){
    //      navigate("/iniciar-sesion")
    //      setLoading(false)
    //  }   
    //  },[userId])


 
    return (
    <>
        <div className="lg:flex ">
            <template className="hidden lg:block">
                <Sidebar />
            </template>

            <div className="flex-1">
            <NavbarWeb></NavbarWeb>

                <div className="container p-4 mx-auto">
                    <h1 className="mb-2">Acciones</h1>
                    <p>Encontrá acá todas las acciones disponibles para agregar. Junto con tips que podrian ser útiles.</p>
                </div>

            <ItemListContainer></ItemListContainer>

                </div>
             
            </div>
        
        <div className="block lg:hidden mt-8">
            <Menu></Menu>
        </div>
    </>
    );
}
