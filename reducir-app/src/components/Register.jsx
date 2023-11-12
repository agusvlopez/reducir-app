import React, { useState, useRef } from "react";
import logo from './../covers/logo-horizontal.png';
import { useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/react";
import  NavbarWeb  from "./NavbarWeb";
import {useAuth} from "../context/AuthContext";

export function Register () {
    const auth = useAuth();

    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [favorites, setFavorites] = useState("");
    //console.log(emailRegister, passwordRegister, "Estados del formulario en registro");

    const handleRegister = (e) => {
        e.preventDefault();
        auth.register(emailRegister, passwordRegister, favorites);

    }
  

    return (
        <>
        <NavbarWeb></NavbarWeb>
        <div className="container p-8 mx-auto min-h-screen max-w-sm">
        <div className="backgroundWhite p-6 mt-2 rounded-2xl shadow-sm min-w-md">
        <h1 className="text-2xl mt-2 mb-2 text-center">Registrarse</h1>

        <form action=""
        method=""
        onSubmit={(e)=> handleRegister(e)}
        >
            <div className="mb-3">
                <label className="mb-2 text-sm">Nombre</label>
                <input 
                    
                    name="name"    
                    // ref={nameRef}
                    type="text" 
                    id="name" 
                    placeholder="Ingresá tu nombre"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-3">
                <label className="mb-2 text-sm">Email</label>
                <input 
                    onChange={(e) => setEmailRegister(e.target.value)}
                    name="email"       
                    // ref={emailRef}
                    type="email" 
                    id="email" 
                    placeholder="Ingresá tu email"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 text-sm">Contraseña</label>
                <input
                    onChange={(e) => setPasswordRegister(e.target.value)}
                    name="password"   
                    // ref={passRef}
                    type="password" 
                    id="password"                   
                    placeholder="Ingresá tu contraseña"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 text-sm">Confirmar contraseña</label>
                <input
                    name="confirm_password"   
                    // ref={passConfirmRef}
                    type="password" 
                    id="passwordConfirm"                   
                    placeholder="Confirmá tu contraseña"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="flex justify-center mt-3">
                <Button type="submit" className="backgroundDarkGreen text-white"
                value="registrarse">
                Registrarse
                </Button>
            </div>
        </form>
        </div>
        </div>
        </>
    )
}
