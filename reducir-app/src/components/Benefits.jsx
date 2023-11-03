import React from "react";
import { Menu } from "./Menu";
import NavbarAplication from "./NavbarAplication";
import VerticalCard from "./VerticalCard";
import Meraki from '../covers/benefits/meraki.jpg';
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

export function Benefits () {


    return (
    <>
        <NavbarAplication></NavbarAplication>
        <div className="container p-4 mx-auto">
            <h1 className="mb-2">Beneficios</h1>
            <p>Acá encontrarás según tu ubicación los beneficios que podes canjear gracias a las acciones realizadas que compartiste.</p>
        </div>
        
        <section className="backgroundDarkGreen rounded-t-lg p-4 mb-8 pb-8 mx-auto">
        <div className="mb-8 mt-4">
            <div className="backgroundWhite p-4 rounded-xl shadow-sm lg:flex gap-4">     
                <div>
                    <VerticalCard
                        tituloCard="1253 puntos"
                        subtituloCard="30% de descuento en MERAKI"
                        pCard={<Link to="https://merakisustentable.com/ar/">Visitar página de la marca</Link>}
                        imgCard={Meraki}
                    ></VerticalCard>
                    <div className="flex justify-center">
                        <Button className="mt-2 font-bold">
                            Canjear +
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </section>
        <Menu></Menu>
    </>
    );
}

