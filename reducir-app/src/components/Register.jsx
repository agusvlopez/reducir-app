import React, { useState, useRef } from "react";
import logo from './../covers/logo-horizontal.png';
import { useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/react";
import  NavbarWeb  from "./NavbarWeb";

export function Register () {
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const passConfirmRef = useRef();

    const navigate = useNavigate();
    const users = [];

    const register = (event) => {
        event.preventDefault();
        const inputName = nameRef.current.value;
        const inputEmail = emailRef.current.value;
        const inputPass = passRef.current.value;
        const inputConfirmPass = passConfirmRef.current.value;

        if(inputPass != inputConfirmPass){
            navigate("/register");
            //aca deberia aparecer un alert de error para avisarle al usuario
            return console.log("error, las contraseñas no coinciden.");
        }else{
            console.log("hola");
            let newUser = {
                name: inputName,
                email: inputEmail,
                pass: inputPass
            }

            users.push(newUser);
            console.log(users);
            navigate("/welcome");
    
            console.log(emailRef.current.value);
            console.log(inputEmail, "pass ", inputPass);
            console.log(event);
        }
    };

   

    return (
        <>
        <NavbarWeb></NavbarWeb>
        <div className="container p-8 mx-auto min-h-screen">

        <div className="flex justify-center w-full p-2 mb-4">
            <img src={logo} alt="Logo de Reducir" />
        </div>
        <div className="backgroundWhite p-6 mt-2 rounded-2xl shadow-sm min-w-md">
        <h1 className="text-2xl mt-2 mb-2 text-center">Registrarse</h1>
        
        <form action="#"
        onSubmit={register}>
            <div className="mb-3">
                <label className="mb-2 text-sm">Nombre</label>
                <input     
                    ref={nameRef}
                    type="text" 
                    id="name" 
                    placeholder="Ingresá tu nombre"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-3">
                <label className="mb-2 text-sm">Email</label>
                <input     
                    ref={emailRef}
                    type="email" 
                    id="email" 
                    placeholder="Ingresá tu email"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 text-sm">Contraseña</label>
                <input
                    ref={passRef}
                    type="password" 
                    id="password"                   
                    placeholder="Ingresá tu contraseña"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 text-sm">Confirmar contraseña</label>
                <input
                    ref={passConfirmRef}
                    type="password" 
                    id="password"                   
                    placeholder="Confirmá tu contraseña"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="flex justify-center mt-3">
                <Button className="backgroundDarkGreen text-white">
                Registrarse
                </Button>
            </div>
        </form>
        </div>
        </div>
        </>
    )
}
