import React, { useEffect } from "react";
import { Menu } from "./Menu";
import RecycleImg from "../covers/actions/recycle.jpg";  
import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavbarWeb from "./NavbarWeb";
import { useAuth } from "../context/authContext";

export function Achievements () {

    return (
    <> 
        <div className="lg:flex">
            <template className="hidden lg:block">
                <Sidebar />
            </template>

        <div className="flex-1">
        <NavbarWeb></NavbarWeb>
        <div className="container mx-auto p-4">
            <h1 className="mb-2">Logros</h1>
            <p>Tus logros realizados se encuentran acá... ¡compartilos con todos en las redes sociales!</p>
        </div>
        <section className="backgroundDarkGreen min-h-screen rounded-t-lg p-4 pb-8 mx-auto">

        <div className="mb-8 mt-4">
        <div className="backgroundWhite p-4 rounded-xl shadow-sm lg:flex gap-4">     
        <img src={RecycleImg} alt="" className="max-h-72 rounded-lg" />    
        <div>
            <h2>Separar la basura</h2>
            <small>Categoría: Reciclaje</small>
            <p>Separar la basura adecuadamente es una forma importante de contribuir al cuidado del medio ambiente y al reciclaje.Conoce las categorías de reciclaje: Aprende qué materiales son reciclables en tu área y cómo se deben separar. Por lo general, se pueden clasificar en papel y cartón, vidrio, plástico, metal y residuos orgánicos.

            Contenedores de reciclaje: Utiliza contenedores de reciclaje para separar los materiales reciclables de los residuos no reciclables. Asegúrate de que estén claramente etiquetados y ubicados en lugares convenientes en tu hogar.</p>
            <div className="flex justify-end">  
            <Link to="">
                <span className="iconShare mr-2 mt-4"></span>
            </Link>
            </div>
        
        </div>
        </div>
        </div>      
        </section>
        
        </div>
        </div>
        <div className="block lg:hidden mt-8">
            <Menu></Menu>
        </div>
       
    </>
    );
}

