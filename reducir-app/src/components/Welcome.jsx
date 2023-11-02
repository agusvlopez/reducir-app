import React from "react";
import logo from './../covers/logo-horizontal.png';
import { Link, useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/react";

export function Welcome () {


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
        <div className="backgroundWhite p-8 mt-2 rounded-2xl shadow-sm min-w-md">
          
            <p className="mb-2 pb-2 border-b-2 border-gray-300"><strong>Reducir</strong> fue diseñada para ayudarte a <strong>cambiar tus hábitos</strong> por unos más beneficiosos para el mundo y asi tambien <strong>reducir tu huella de carbono</strong>, que es una manera de medir tu impacto ambiental.</p>

            <p>Entonces, para <strong>medir tu huella de carbono</strong>, te invitamos a realizar un <span className="font-bold">test con 3 simples preguntas</span> acerca del transporte y energía por única vez.</p> 

            <div className="flex justify-center mt-4">
                <Button className="backgroundDarkGreen text-white w-full flex justify-between items-center">
                Iniciar test <span className="arrowRight ml-6"></span>
                </Button>
            </div>
        </div>
    </div>

    </>
    );
}



