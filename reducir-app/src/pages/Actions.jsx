import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import {Menu} from "../components/Menu";
import {Chip} from "@nextui-org/react";
import HorizontalCard from "../components/HorizontalCard";
import NavbarWeb from "../components/NavbarWeb";
import ItemListContainer from "../components/ItemListContainer";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


export function Actions () {
   

    return (
    <>
        <div className="lg:flex ">
            <template className="hidden lg:block">
                <Sidebar />
            </template>
        <div className="flex-1">
                <div className="container p-6 mx-auto">
                    <h1 className="mb-2">Acciones</h1>
                    <p>Encontrá acá todas las acciones disponibles para agregar. Junto con tips que podrian ser útiles.</p>
                </div>
                <ItemListContainer></ItemListContainer>
            </div>           
        </div>       
        <div className="block lg:hidden mt-8">
            <Menu></Menu>
        </div>
    </>
    );
}
