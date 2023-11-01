import React, { useState } from 'react';
import menuHamburguer from '../covers/icons/menu-green.png'
import logoNav from '../covers/nombre-large.png';

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
    <section>
    <nav className="backgroundWhite p-4 ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold"><img className='navLogo' src={logoNav}></img></div>

        <div className="md:hidden">
          <a
            onClick={toggleMenu}
            className="focus:outline-none"
          >
           <img className='menuHamburguer' src={open ? menuHamburguer : menuHamburguer} /> 
          </a>
        </div>
      </div>
      <div className={`md:flex ${open ? 'block' : 'hidden'}`}>
          <ul className="md:flex text-end mt-2 content-end textDarkGreen">
            <li><a href="#" className="textDarkGreen p-2 border-b-2 block">Configuración de la cuenta</a></li>
            <li><a href="#" className="textDarkGreen p-2 border-b-2 block">Compartir con un/a amigo/a</a></li>
            <li><a href="#" className="textDarkGreen p-2 border-b-2 block">Redes sociales</a></li>
            <li><a href="#" className="textDarkGreen p-2 border-b-2 block">Rehacer test</a></li>
          </ul>
        </div>
    </nav>
    </section>
    </>
  );
}

export default Navbar;