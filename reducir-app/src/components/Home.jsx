import React from "react";
import NavbarWeb from './NavbarWeb';
import {Button} from "@nextui-org/react";
import homeApp from '../covers/home-app.jpg';
import homeLoginApp from '../covers/home-2-app.jpg';
import home3 from '../covers/home-3.jpg';
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import vectorMiniHojas from '../covers/vector-mini-2.png';

import 'animate.css';

export function Home () {
    const navigate = useNavigate();

    return (
    <>    
    <div className="container p-4 mx-auto">
        <div>
        <section className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left md:p-4">
                <h1 className="invisible">App Reducir</h1>
                <div className="relative p-2">
                    <div className="absolute top-[-25px] left-[-20px] md:left-[-25px]">
                        <img src={vectorMiniHojas} className="animate__animated animate__swing" />
                    </div>
                    <h2 className="text-5xl mb-6 p-1 relative z-10 text-left">
                        <span className="block">Estás a un <span className="font-semibold textDarkGreen">click</span></span> 
                        <span className="block">de <span className="textDarkGreen font-semibold">cambiar </span>
                        tus <span className="textDarkGreen font-semibold">hábitos </span></span>
                        <span className="block">y el <span className="font-semibold textDarkGreen">mundo</span></span>
                    </h2>
                </div>
                <div className="pl-3 text-left">
                    <p className="mb-4 "><strong className="italic">reducir</strong> es una <strong>aplicación web</strong> y <strong><span lang="en" >mobile</span></strong> que te acompaña en tu día a día ayudándote a <span className="font-bold textDarkGreen">incorporar hábitos amigables con el medio ambiente</span>.</p>
                    <p className="mb-6">Animate a dar el primer paso para construir un mundo mejor. <span className="font-semibold textDarkGreen">¡Registrate ahora!</span></p>
                        <Button 
                        onPress={() => { navigate("/registrarse") }} 
                        className="backgroundDarkGreen text-white rounded-full py-4 px-4 transition duration-300">Registrarse
                        </Button>
                </div>
            </div>
            <div className="text-center">
                <img src={homeApp} alt="Captura de pantalla de la aplicación" className="w-full rounded-lg shadow-lg" />
            </div>
            </div>         
        </section>
        </div>
    </div>
    <div className="backgroundOrange p-4 mx-auto">
        <div>
            <section className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                    <img src={homeLoginApp} alt="Persona usando el celular en el login de la aplicación." className="w-full rounded-lg shadow-lg" />
                </div>
                <div className="text-center md:text-left">
                    <div className="relative p-2">
                        <div className="absolute top-[-25px] right-0">
                            <span className="vector-hoja"><span className="invisible">Vector de una hoja</span></span>
                        </div>
                        <h3 className="text-xl text-white mb-6 p-1 relative z-10 text-right">
                            <strong className="text-white">Medí tu huella de carbono</strong> e incorporá nuevos hábitos para <strong  className="text-white">reducir</strong> tu huella <span className="font-semibold">día a día</span>.
                        </h3>
                    </div> 
                    <div className="pl-3 text-left">
                    </div>
                </div>
                </div>          
            </section>
        </div>
    </div>
    <div className="backgroundWhite container p-4 mx-auto">
        <div>
            <section className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <div className="relative p-2">
                        <div className="absolute top-[-25px] left-0">
                            <span className="vector-hoja-naranja"><span className="invisible">Vector de una hoja</span></span>
                        </div>
                        <h3 className="text-xl mb-6 p-1 relative z-10 text-left">
                            <strong>Ganá premios</strong> y <strong>obtené descuentos</strong> exclusivos en marcas amigables con el medioambiente por usar la App. 
                        </h3>
                    </div> 
                    <div className="pl-3 text-left">
                    </div>
                </div>
                <div className="text-center">
                    <img src={home3} alt="Persona usando el celular en el login de la aplicación." className="w-full rounded-lg shadow-lg" />
                </div>
                </div>          
            </section>
        </div>
    </div>
    <Footer></Footer>
    </>
    );
}



