import React from "react";
import { Menu} from "./Menu";
import NavbarAplication from "./NavbarAplication";
import VerticalCard from './VerticalCard';
import RecycleImg from "../covers/actions/recycle.jpg";  
import {HeartIcon} from "./HeartIcon";
import { Button } from "@nextui-org/react";

export function Action () {
    const [liked, setLiked] = React.useState(false);

    return (
    <>
        <NavbarAplication></NavbarAplication>
        <div className="container p-4 mx-auto">
            <h1 className="mb-2">Acción ...</h1>
            <p>Acá va la descripción de la acción.</p>
        </div>
        <section className="backgroundDarkGreen rounded-t-lg p-4 mb-8 pb-8 mx-auto">

        <div className="mb-8 mt-4">
        <div className="backgroundWhite p-4 rounded-xl shadow-sm lg:flex gap-4">     
        <img src={RecycleImg} alt="" className="max-h-72 rounded-lg" />    
        <div>
            <h2>Separar la basura</h2>
            <small>Categoría: Reciclaje</small>
            <p>Separar la basura adecuadamente es una forma importante de contribuir al cuidado del medio ambiente y al reciclaje.Conoce las categorías de reciclaje: Aprende qué materiales son reciclables en tu área y cómo se deben separar. Por lo general, se pueden clasificar en papel y cartón, vidrio, plástico, metal y residuos orgánicos.

            Contenedores de reciclaje: Utiliza contenedores de reciclaje para separar los materiales reciclables de los residuos no reciclables. Asegúrate de que estén claramente etiquetados y ubicados en lugares convenientes en tu hogar.</p>
            <div className="flex justify-end">    
                <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 mt-2 mr-2"
                    radius="full"
                    variant="light"
                    onPress={() => setLiked((v) => !v)}
                >
                    <HeartIcon
                    className={liked ? "[&>path]:stroke-transparent" : ""}
                    fill={liked ? "currentColor" : "none"}
                    />
                </Button>
            </div>

            <form action="" method="post"
            onSubmit="" className="flex justify-center lg:justify-end">
                <Button type="submit" className="backgroundDarkGreen text-white">Agregar como logro +</Button>
            </form>
        </div>
        </div>
        </div>
        </section>
        <div className="mt-4">
            <Menu></Menu>
        </div>
    </>
    );
}

