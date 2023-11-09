import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/react";
import  NavbarWeb  from "./NavbarWeb";
import { useAuth } from "../context/AuthContext";


export function Login () {
    const navigate = useNavigate();
    const auth = useAuth();
    const {displayName} = auth.user;
    const displayEmail = auth.user.email;
    console.log(displayName);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log(email, password, "estados de login");

    const handleLogin = (e) => {
        console.log(email, password);
        e.preventDefault();
        auth.login(email, password);     
        navigate("/perfil");
       
    }

    const handleGoogle = (e) => {
        e.preventDefault();
        auth.loginWithGoogle();
        navigate("/perfil");
    }
    // const [inputEmail, setInputEmail] = useState('');
    // const [inputPass, setInputPass] = useState('');

    // const navigate = useNavigate();

    // const authUser = 
    // {
    //     email: 'ana@io.com',
    //     pass: '123',
    // };
    
    // const login = (event) => {
    //     event.preventDefault();

    //     if(inputEmail === authUser.email && inputPass === authUser.pass){
    //         console.log("hola");
    //        navigate("/perfil");
    //     }

    //     console.log(inputEmail, "pass ", inputPass);
    //     // console.log(event);
    // };


    return (
        <>
        <NavbarWeb></NavbarWeb>
        <div className="container p-8 mx-auto min-h-screen max-w-sm">
        <div className="backgroundWhite p-6 mt-2 rounded-2xl shadow-sm min-w-md">
        <h1 className="text-2xl mt-2 mb-2 text-center">Iniciar sesión</h1>
        <form
        onSubmit={(e)=>handleLogin(e)}>
            <div className="mb-3">
                <label className="mb-2 text-sm">Email</label>
                <input     
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    id="email" 
                    placeholder="Ingresá tu email"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 text-sm">Contraseña</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    id="password"                   
                    placeholder="Ingresá tu contraseña"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="flex justify-center">
                <Button type="submit" value="login" className="bg-white textDarkGreen shadow">Ingresar</Button>
            </div>
            </form>

            <p className="text-center mt-8">¿Aún no tenes una cuenta?</p>  
            <div className="flex justify-center mt-3">
                <Button className="backgroundDarkGreen">
                    <Link className="text-white" to="">Registrarse</Link>
                </Button>  
            </div>
            <div className="flex justify-center mt-3">
                <Button className="bg-white shadow" onClick={(e)=> handleGoogle(e)}>
                    <Link className="textDarkGreen" to="">Ingresar con Google</Link>
                </Button>  
            </div>
        </div>
        </div>
        </>
    )
}
