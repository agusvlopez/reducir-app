import React from "react";
import { Menu } from "./Menu";
import VerticalCard from "./VerticalCard";
import Meraki from '../covers/benefits/meraki.jpg';
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import Sidebar from "./Sidebar";
import NavbarWeb from "./NavbarWeb";

export function Benefits () {


    return (
    <>
    
        <div className="lg:flex">
            <template className="hidden lg:block">
                <Sidebar />
            </template>

        <div className="flex-1">
        <NavbarWeb></NavbarWeb>
        <div className="container mx-auto p-4">
            <h1 className="mb-2">Beneficios</h1>
            <p>Acá encontrarás según tu ubicación los beneficios que podes canjear gracias a las acciones realizadas que compartiste.</p>
        </div>
        
        <section className="backgroundDarkGreen min-h-screen rounded-t-[30px] p-4 pb-8 mx-auto">
        <div className="mb-8 mt-4">
            <div className="p-4 md:flex gap-4">     
                <div>
                    <VerticalCard
                        tituloCard="1253 puntos"
                        subtituloCard="30% de descuento en MERAKI"
                        pCard={<Link to="https://merakisustentable.com/ar/"
                        >Visitar página de la marca</Link>}
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
        </div>
        </div>
        <div className="block lg:hidden mt-8">
            <Menu></Menu>
        </div>
    </>
    );
}

