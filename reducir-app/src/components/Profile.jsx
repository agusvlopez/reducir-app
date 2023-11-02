import React from "react";
import { Menu } from './Menu.jsx'; 
import userImg from './../covers/user.png';
import NavbarAplication from "./NavbarAplication.jsx";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export function Profile () {


    return (
        <>
        <NavbarAplication></NavbarAplication>
        <div className="h-full">       
        </div>
        <div className="">
        <div className="backgroundWhite shadow-md rounded px-8 pb-8 mb-8">
            <div className="mb-2">
                <h1 className="invisible">Mi perfil</h1>  
                <h2 className="text-2xl font-bold text-center mb-4">¡Hola usuario!</h2>
                <img src={userImg} alt="Foto de perfil" className="bg-white w-28 h-28 rounded-full mx-auto border-4 border-white shadow-md" />
                
                <p className="text-gray-600 text-center mt-4">Mi huella de carbono este mes:</p>
                <p className="font-bold text-center">72kg de CO2</p>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold p-2">Mis acciones en proceso</h2>
                <div>
                    <ul className="flex h-32">
                        <div className="p-2 m-1 backgroundOrange text-white rounded-md shadow-md">Acción 1</div>
                        <div className="p-2 m-1 backgroundOrange text-white rounded-md shadow-md">Accion 2</div>
                    </ul>
                </div>
                <div className="flex justify-center mt-6 mb-8">
                <Link to="/acciones">
                    <Button className="buttonDarkGreen">Agregar un acción <span className="ml-6">+</span> </Button>
                </Link>
                </div>
            </div>
        </div>
              
            </div> 
            <Menu></Menu>
        </>
    );
}


