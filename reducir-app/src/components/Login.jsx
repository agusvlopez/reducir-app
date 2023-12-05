import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/react";
import  NavbarWeb  from "./NavbarWeb";
import { useAuth } from "../context/AuthContext";
import warningIcon from "../covers/icons/warning-icon.png";
import logo from '../covers/logo-horizontal.png';

export function Login () {
    const navigate = useNavigate();
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    console.log(email, password, "estados de login");

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        console.log(email, password);
        e.preventDefault();

        if (!email || !password) {
            setValidationMessage("Todos los campos son obligatorios.");
            return;
        }

        try {
            await auth.login(email, password);
            navigate("/perfil");
        } catch (error) {
            setValidationMessage("Error al iniciar sesión. Verifica tus credenciales.");
        }
       
    }

    const handleGoogle = (e) => {
        e.preventDefault();
        auth.loginWithGoogle();
        navigate("/perfil");
    }

    return (
        <>
        <div className="p-8 mx-auto min-h-screen backgroundTrama">
        <div className="container max-w-sm mx-auto backgroundWhite p-6 mt-2 rounded-[24px] shadow-sm">
        <div className="p-2">
            <div className="flex justify-center mb-4">
                <img src={logo} />
            </div>        
            <h1 className="text-2xl mt-1 mb-2 text-center p-1">¡Bienvenido/a de vuelta!</h1>
        </div>
        {validationMessage && (
        <div className="mb-4 flex items-center justify-center text-red-500">
            <img src={warningIcon} className="mr-2 w-8 h-8" /><span><span className="font-bold pr-1">¡Atención!</span> 
            {validationMessage}</span>
        </div>
        )}

        <form
        onSubmit={(e)=>handleLogin(e)}>
            <div className="mb-3">
                <label htmlFor="email" className="mb-2 text-sm">Email</label>
                <input     
                    onChange={handleEmailChange}
                    type="email" 
                    id="email" 
                    placeholder="Ingresá tu email"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="mb-2 text-sm">Contraseña</label>
                <input
                    onChange={handlePasswordChange}
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

            <p className="text-center mt-8">¿Aún no tenés una cuenta?</p>  
            <div className="flex justify-center mt-3">
                <Link to="/registrarse">
                    <Button 
                    className="backgroundDarkGreen text-white hover:text-white">
                    Registrarse
                    </Button>  
                </Link>
            </div>
            <div className="flex justify-center mt-3">
                <Link className="textDarkGreen">
                <Button className="bg-white shadow" onClick={(e)=> handleGoogle(e)}>
                    Ingresar con Google
                </Button>  
                </Link>
            </div>
        </div>
        </div>
        </>
    )
}
