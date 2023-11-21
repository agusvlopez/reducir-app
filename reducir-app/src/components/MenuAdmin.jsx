import { Chip } from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';

function MenuAdmin() {
  return (
    <>
    <div className="flex gap-2 pt-4 pb-4 container mx-auto justify-center">
        <Link to="/admin">
            <Chip size="md" className="cursor-pointer hover:drop-shadow-md">Administrador</Chip>
        </Link>
        <Link to="/admin/acciones">
            <Chip size="md" className="cursor-pointer hover:drop-shadow-md">Todas las acciones</Chip>
        </Link>
        <Link to="/admin/acciones/new">
            <Chip size="md" className="cursor-pointer hover:drop-shadow-md">Agregar una acción</Chip>
        </Link>
    </div> 
    </>
  );
}

export default MenuAdmin;