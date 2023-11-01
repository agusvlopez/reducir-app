import React from "react";
import {NavbarWeb} from './NavbarWeb';
import {Button} from "@nextui-org/react";
import homeApp from '../covers/home-app.jpg';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import benefitsCard from '../covers/benefits.jpg';
import tipsCard from '../covers/tips.jpg';
import worldCard from '../covers/world.jpg';

export function Home () {


    return (
    <>    
    <NavbarWeb></NavbarWeb>
    <div className="container p-4">
        <div>
        <section className="container mx-auto mt-8 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">App Reducir</h1>
                <p className="text-gray-600 mb-4">Reducir es una aplicación web y <span lang="en">mobile</span> que te acompaña en tu dia a dia ayudandote a incorporar hábitos mas amigables con el medio ambiente.</p>
                <p className="text-gray-600 mb-4">Animate a dar el primer paso para construir un mundo mejor. <span className="font-bold">¡Registrate ahora!</span></p>
                <a href="#" className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition duration-300">Registrarse</a>
            </div>
            <div className="text-center">
                <img src={homeApp} alt="Captura de pantalla de la aplicación" className="w-full rounded-lg shadow-lg" />
            </div>
            </div>
            
        </section>

        {/* Sección de características */}
        <section className="container mx-auto mt-8 p-2">
            <h2 className="text-3xl font-bold mb-4">¿Por qué deberías instalar nuestra App?</h2>
            <div className="flex flex-wrap">
            <Card className="py-4 m-1">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Beneficios</p>
                <small className="text-default-500">Obtené beneficios por utilizar la app</small>
                <h3 className="font-bold text-large">Muchos regalos y descuentos</h3>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                alt="Ilustracion de personajes con premios"
                className="object-cover rounded-xl"
                src={benefitsCard}
                width={270}
                />
            </CardBody>
            </Card>
            <Card className="py-4 m-1">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Acciones con Tips</p>
                <small className="text-default-500">Obtené tips para lograr realizar las acciones</small>
                <h3 className="font-bold text-large">Ayuda para lograr los objetivos</h3>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={tipsCard}
                width={270}
                />
            </CardBody>
            </Card>
            <Card className="py-4 m-1">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Acciones a favor del medio ambiente</p>
                <small className="text-default-500">Incorporá hábitos más ecológicos</small>
                <h3 className="font-bold text-large">Construir un mundo mejor</h3>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={worldCard}
                width={270}
                />
            </CardBody>
            </Card>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Característica 1</h3>
                <p className="text-gray-600 mt-2">Una descripción breve de la característica.</p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Característica 2</h3>
                <p className="text-gray-600 mt-2">Otra descripción breve de la característica.</p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Característica 3</h3>
                <p className="text-gray-600 mt-2">Tercera descripción breve de la característica.</p>
            </div>
            </div> */}
        </section>
        </div>
    </div>
    </>
    );
}



