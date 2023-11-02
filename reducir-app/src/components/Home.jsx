import React from "react";
import NavbarWeb from './NavbarWeb';
import {Button} from "@nextui-org/react";
import homeApp from '../covers/home-app.jpg';
import Footer from "./Footer";
import { Link } from "react-router-dom";
import VerticalCard from './VerticalCard';
import benefitsCard from '../covers/benefits.jpg';
import tipsCard from '../covers/tips.jpg';
import worldCard from '../covers/world.jpg';

export function Home () {


    return (
    <>    
    <NavbarWeb></NavbarWeb>
    <div className="container p-4 mx-auto">
        <div>
        <section className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">App Reducir</h1>
                <p className="text-gray-600 mb-4">Reducir es una aplicación web y <span lang="en">mobile</span> que te acompaña en tu dia a dia ayudandote a incorporar hábitos mas amigables con el medio ambiente.</p>
                <p className="text-gray-600 mb-4">Animate a dar el primer paso para construir un mundo mejor. <span className="font-bold">¡Registrate ahora!</span></p>
                <Link to="/registrarse">
                    <Button className="backgroundDarkGreen text-white rounded-full py-2 px-4 transition duration-300">Registrarse</Button>
                </Link>
            </div>
            <div className="text-center">
                <img src={homeApp} alt="Captura de pantalla de la aplicación" className="w-full rounded-lg shadow-lg" />
            </div>
            </div>
            
        </section>

    
        </div>
    </div>
        {/* Sección de características */}
        <section className="mx-auto mt-8 pb-6 p-2 backgroundTrama">
            <div className="flex justify-center">
            <h2 className="text-2xl font-bolder m-4 text-center bg-white rounded-lg p-2 w-fit">¿Por qué deberías instalar nuestra App?</h2>
            </div>
            <div className="flex flex-wrap justify-around">
            <VerticalCard
            tituloCard="Beneficios"
            subtituloCard="Obtené beneficios por utilizar la app"
            pCard="Muchos regalos y descuentos"
            imgCard={benefitsCard}
            >    
            </VerticalCard>
            <VerticalCard
            tituloCard="Acciones con Tips"
            subtituloCard="Obtené tips para lograr realizar las acciones"
            pCard="Ayuda para lograr los objetivos"
            imgCard={tipsCard}
            >    
            </VerticalCard>
            <VerticalCard
            tituloCard="Acciones a favor del medio ambiente"
            subtituloCard="Incorporá hábitos más ecológicos"
            pCard="Construir un mundo mejor"
            imgCard={worldCard}
            >    
            </VerticalCard>
            </div>
        </section>
    <Footer></Footer>
    </>
    );
}



