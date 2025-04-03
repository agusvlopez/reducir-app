import React from "react";
import NavbarWeb from '../components/NavbarWeb';
import { Button } from "@nextui-org/react";
import homeApp from '../covers/home-app.jpg';
import homeLoginApp from '../covers/home-2-app.jpg';
import mockupMobile from '../covers/home/mockup.png';
import home3 from '../covers/home-3.jpg';
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import vectorMiniHojas from '../covers/vector-mini-2.png';
import vectorSheet from '../covers/vector-sheet.png';
import merakiLogo from '../covers/home/meraki-white.svg';
import logo2 from '../covers/home/logo-marca2.svg';
import lightLogo from '../covers/logo-horizontal-lg-light.svg';

import 'animate.css';
// Import Swiper styles

import About from "../components/home/about";
import Community from "../components/home/Community";
import AppSection from "../components/home/AppSection";
import Heading from "../components/Base/Heading";

export function Home() {
    return (
        <>
            {/* <div>
                <img
                    src={bannerHome}
                    alt="Captura de pantalla de la aplicación"
                    className="w-full h-[90vh] object-cover"
                />
            </div> */}
            <div className="">
                <section className="">
                    <div className="header h-screen rounded-b-[60px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-center md:text-left p-4 md:p-12 lg:p-16">
                                <h1 className="invisible">App Reducir</h1>
                                <div className="relative p-2">
                                    <div className="absolute top-[-25px] left-[-20px] md:left-[-25px]">
                                        <img src={vectorMiniHojas} className="animate__animated animate__swing" />
                                    </div>
                                    <Heading tag="h2" color="darkGreen" className="mb-6 p-1 relative z-10 text-left">
                                        <span className="block">Estás a un <span className="font-semibold textDarkGreen">click</span></span>
                                        <span className="block">de <span className="textDarkGreen font-semibold">cambiar </span>
                                            <span className="block">tus <span className="textDarkGreen font-semibold">hábitos </span></span></span>
                                        <span className="block">y el <span className="font-semibold textDarkGreen">mundo</span></span>
                                    </Heading>
                                </div>
                                <div className="mt-6">
                                    <Button className="backgroundDarkGreen text-white rounded-full py-4 px-4 transition duration-300">Empezar</Button>
                                </div>
                                {/* <div className="pl-3 text-left">
                                    <p className="mb-4 "><strong className="italic">reducir</strong> es una <strong>aplicación web</strong> y <strong><span lang="en" >mobile</span></strong> que te acompaña en tu día a día ayudándote a <span className="font-bold textDarkGreen">incorporar hábitos amigables con el medio ambiente</span>.</p>
                                    <p className="mb-6">Animate a dar el primer paso para construir un mundo mejor. <span className="font-semibold textDarkGreen">¡Registrate ahora!</span></p>
                                    <Link to="/registrarse">
                                        <Button className="backgroundDarkGreen text-white rounded-full py-4 px-4 transition duration-300">Registrarse</Button>
                                    </Link>
                                </div> */}
                            </div>
                            <div className="text-center overflow-hidden">
                                <img
                                    src={homeApp}
                                    alt="Captura de pantalla de la aplicación"
                                    className="w-full object-cover overflow-hidden h-screen rounded-br-[60px] clipped-image"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* SECTION 2 */}
            <About />
            {/* <div className="backgroundApp h-screen">
                <div>
                    <section className="">
                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-center w-[65%] -mt-[10%]">
                                <img src={vectorSheet} alt="" className="w-full h-fit" />
                            </div>
                            <div className="text-center md:text-left absolute w-[30%] text-white p-6 pt-0 ">
                                <div className="relative p-2">
                                    <div className="absolute top-[-25px] left-0">
                                        <span className="vector-hoja-naranja"><span className="invisible">Vector de una hoja</span></span>
                                    </div>
                                    <h3 className="text-xl mb-6 p-1 relative z-10 text-left">
                                        <strong className="text-white">Ganá premios</strong> y <strong className="text-white">obtené descuentos</strong> exclusivos en marcas amigables con el medioambiente por usar la App.
                                    </h3>
                                </div>
                            </div>
                            <div className="text-center">
                                <img src={homeLoginApp} alt="Persona usando el celular en el login de la aplicación." className="w-full shadow-lg" />
                            </div>
                        </div>
                    </section>
                </div>
            </div> */}
            {/* <AppSection /> */}
            <div className="section4 backgroundDarkGreen min-h-screen">
                <section className="pt-[15%] pb-[5%]">
                    <h2 className="text-center text-4xl pb-[6%] text-white font-semibold w-4/6 mx-auto">¡Estas son algunas de las marcas sustentables que nos acompañan!</h2>
                    <div className="flex justify-center items-center gap-12">
                        <li><img src={merakiLogo} alt="" className="w-5/6 mx-auto" /></li>
                        <li><img src={logo2} alt="" className="w-5/6 mx-auto" /></li>
                        <li><img src={merakiLogo} alt="" className="w-5/6 mx-auto" /></li>
                    </div>
                </section>
            </div>
            <Community />
            <Footer></Footer>
        </>
    );
};



