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
import vectorMiniHojas from '../covers/vector-mini-2.png';
import 'animate.css';

export function Home () {
    return (
    <>    
    <NavbarWeb />
    <div className="container p-4 mx-auto">
        <div>
        <section className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left md:p-4">
                <h1 className="invisible">App Reducir</h1>
                <div className="relative p-2">
                    <div className="absolute top-[-25px] left-[-25px]">
                        <img src={vectorMiniHojas} />
                    </div>
                    <h2 className="text-5xl mb-6 p-1 relative z-10 text-left">
                        Estás a un <span className="font-semibold textDarkGreen">click</span> de <span className="textDarkGreen font-semibold">cambiar tus hábitos</span> y el <span className="font-semibold textDarkGreen">mundo</span>
                    </h2>
                </div>
                <div className="pl-3 text-left">
                    <p className="mb-4"><strong>Reducir</strong> es una <strong>aplicación web</strong> y <strong><span lang="en" >mobile</span></strong> que te acompaña en tu día a día ayudándote a <span className="font-bold textDarkGreen">incorporar hábitos amigables con el medio ambiente</span>.</p>
                    <p className="mb-6">Animate a dar el primer paso para construir un mundo mejor. <span className="font-semibold textDarkGreen">¡Registrate ahora!</span></p>
                    <Link to="/registrarse">
                        <Button className="backgroundDarkGreen text-white rounded-full py-4 px-4 transition duration-300">Registrarse</Button>
                    </Link>
                </div>
            </div>
            <div className="text-center">
                <img src={homeApp} alt="Captura de pantalla de la aplicación" className="w-full rounded-lg shadow-lg" />
            </div>
            </div>
            
        </section>

    
        </div>
    </div>
    <div className="backgroundTrama container p-4 mx-auto">
        <div>
            <section className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                    <img src={homeApp} alt="Captura de pantalla de la aplicación" className="w-full rounded-lg shadow-lg" />
                </div>
                <div className="text-center md:text-left">
                    {/* <div className="relative p-2">
                        <div className="absolute top-[-25px] left-[-25px]">
                            <img src={vectorMiniHojas} />
                        </div>
                        <h2 className="text-5xl text-gray-800 mb-6 p-1 relative z-10 text-left">
                            Estás a un <span className="font-bold">click</span> de <strong>cambiar tus hábitos</strong> y el <span className="font-bold">mundo</span>
                        </h2>
                    </div> */}
                    <div className="pl-3 text-left">
                    </div>
                </div>
                </div>
                
            </section>
        </div>
    </div>
        {/* Sección de características
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
        </section> */}
    <Footer></Footer>
    </>
    );
}



