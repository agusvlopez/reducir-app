import React from "react";
import { Menu } from "./Menu";
import NavbarAplication from "./NavbarAplication";

export function Achievements () {


    return (
    <>
        <NavbarAplication></NavbarAplication>
        <div className="container p-4">
            <h1>Logros</h1>
        </div>
        <Menu></Menu>
    </>
    );
}

