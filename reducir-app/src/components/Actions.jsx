import React from "react";
import { Menu} from "./Menu";
import NavbarAplication from "./NavbarAplication";
import {Chip} from "@nextui-org/react";
import HorizontalCard from "./HorizontalCard";

export function Actions () {

    return (
    <>
        <NavbarAplication></NavbarAplication>
        <div className="container p-4 mx-auto">
            <h1 className="mb-2">Acciones</h1>
            <p>Encontrá acá todas las acciones disponibles para agregar. Junto con tips que podrian ser útiles.</p>
        </div>
        <section className="backgroundDarkGreen rounded-t-lg p-2 mb-8 pb-8 mx-auto">
        <div className="flex gap-2 pt-4 pb-4 container mx-auto justify-center">
            <Chip size="md" className="cursor-pointer"> Todas</Chip>
            <Chip size="md" className="cursor-pointer">Energía</Chip>
            <Chip size="md" className="cursor-pointer">Reciclaje</Chip>
            <Chip size="md" className="cursor-pointer">Agua</Chip>
        </div>  
        <div className="mb-8 mt-4">
        <HorizontalCard></HorizontalCard>
        </div>
        </section>
        <Menu></Menu>
    </>
    );
}

