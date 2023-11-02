import React, { useState, useRef } from "react";
import logo from './../covers/logo-horizontal.png';
import { Link, useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/react";
import  NavbarWeb  from "./NavbarWeb";

export function Login () {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPass, setInputPass] = useState('');

    const navigate = useNavigate();

    const authUser = 
    {
        email: 'ana@io.com',
        pass: '123',
    };
    
    const login = (event) => {
        event.preventDefault();

        if(inputEmail === authUser.email && inputPass === authUser.pass){
            console.log("hola");
           navigate("/perfil");
        }

        console.log(inputEmail, "pass ", inputPass);
        // console.log(event);
    };

   

    return (
        <>
        <NavbarWeb></NavbarWeb>
        <div className="container p-8 mx-auto min-h-screen">

        {/* <div className="flex justify-center w-full p-2 mb-4">
            <img src={logo} alt="Logo de Reducir" />
        </div> */}
        <div className="backgroundWhite p-6 mt-2 rounded-2xl shadow-sm min-w-md">
        <h1 className="text-2xl mt-2 mb-2 text-center">Iniciar sesión</h1>
        
        <form action=""
        onSubmit={login}>
            <div className="mb-3">
                <label className="mb-2 text-sm">Email</label>
                <input     

                    value={inputEmail}
                    onChange={(e) => {setInputEmail(e.target.value)}}
                    type="email" 
                    id="email" 
                    placeholder="Ingresá tu email"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 text-sm">Contraseña</label>
                <input

                    value={inputPass}
                    onChange={(e) => {setInputPass(e.target.value)}}
                    type="password" 
                    id="password"                   
                    placeholder="Ingresá tu contraseña"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="flex justify-center">
                <Button type="submit" className="bg-white textDarkGreen shadow">Ingresar</Button>
            </div>
        </form>

            <p className="text-center mt-8">¿Aún no tenes una cuenta?</p>
            <div className="flex justify-center mt-3">
           
                <Button className="backgroundDarkGreen">
                 <Link className="text-white" to="/registrarse">Registrarse</Link>
                </Button>            
            </div>
        
        </div>
        </div>
        </>
    )
}
