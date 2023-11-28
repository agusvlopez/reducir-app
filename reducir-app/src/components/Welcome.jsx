import React, { useEffect } from "react";
import logo from './../covers/logo-horizontal.png';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useAuth } from "../context/authContext";

export function Welcome () {
    // const auth = useAuth();
    // console.log(auth.user);

    return (
    <>
    <div className="container p-8 mx-auto min-h-screen max-w-fit">
        <Link to="/"
        className="text-sm">
            Volver al inicio
        </Link>
        <div className="flex justify-center w-full p-2 mb-6">
        <img src={logo} alt="Logo de Reducir" />
        </div>
          <h1 className="mb-2 text-center pb-2">Bienvenido/a</h1>
        <div className="backgroundWhite mt-2 rounded-2xl shadow-sm min-w-md container mx-auto max-w-2xl p-8">
          
            <p className="mb-2 pb-2 border-b-2 border-gray-300"><strong>Reducir</strong> fue diseñada para ayudarte a <strong>cambiar tus hábitos</strong> para reducir tu impacto ambiental y así también, <strong>reducir tu huella de carbono</strong>.</p>

            <p>Entonces, para <strong>medir tu huella de carbono</strong>, te invitamos a realizar un <span className="font-bold textDarkGreen">test con 3 simples preguntas</span> acerca del transporte, energía y comida por única vez.</p> 

            <div className="flex justify-center mt-4">
                <Link to="/test">
                    <Button className="backgroundDarkGreen text-white w-full flex justify-between items-center">
                        Iniciar test <span className="arrowRight ml-6"></span>
                    </Button>
                </Link>
            </div>
        </div>
    </div>

    </>
    );
}



