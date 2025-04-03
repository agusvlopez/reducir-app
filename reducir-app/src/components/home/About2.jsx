import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import mockupMobile from '../../covers/home/mockup-app-about-home.png';
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

const About2 = () => {
    const mockupRef = useRef(null);

    useEffect(() => {
        // Inicializa VanillaTilt en la imagen mockupMobile
        if (mockupRef.current) {
            VanillaTilt.init(mockupRef.current, {
                max: 25,
                speed: 400,
                glare: true,
                "max-glare": 0.8,
            });
        }
    }, []);

    return (
        <div className="py-[12%] flex items-center">
            <section className="container mx-auto textDarkGreen w-9/12 max-h-[80vh]">
                <div className="flex items-center justify-center">
                    <div className="text-center w-[45%] -my-[15%]">
                        {/* Imagen con efecto 3D y animación */}
                        <img
                            ref={mockupRef}
                            src={mockupMobile}
                            alt="Persona usando el celular en el login de la aplicación."
                            className="w-full transform transition-transform duration-700 ease-in-out"
                        />
                    </div>
                    <div className="text-xl w-1/2 p-4 pb-0 relative -mb-[2%]">
                        <div className="absolute top-[-5%] left-0">
                            <span className="vector-hoja">
                                <span className="invisible">Vector de una hoja</span>
                            </span>
                        </div>
                        <div className="relative flex flex-col items-center justify-center w-5/6">
                            <p className="mb-6 textDarkGreen">
                                <strong className="italic">reducir</strong> es una{" "}
                                <strong>aplicación web</strong> y <strong><span lang="en">mobile</span></strong> que te acompaña en tu día a día ayudándote a{" "}
                                <span className="font-bold">incorporar hábitos amigables con el medio ambiente</span>.
                            </p>
                            <p className="mb-12 textDarkGreen">
                                Animate a dar el primer paso para construir un mundo mejor.{" "}
                                <span className="font-semibold">¡Registrate ahora!</span>
                            </p>
                            <Link to="/registrarse">
                                <p className="hover:shadow-lg text-xl backgroundDarkGreen text-white font-semibold rounded-full py-4 px-8 transition duration-300">
                                    Registrarse
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About2;
