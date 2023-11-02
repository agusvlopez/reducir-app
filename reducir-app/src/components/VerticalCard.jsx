import React from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

function VerticalCard({
    tituloCard,
    subtituloCard,
    pCard,
    imgCard
}) {
  return (
    <>
            {/* <div className="flex flex-wrap justify-around"> */}
            <Card className="py-4 m-1">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{tituloCard}</p>
                <small className="text-default-500">{subtituloCard}</small>
                <p className="font-bold text-large">{pCard}</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                alt="Ilustracion de personajes con premios"
                className="object-cover rounded-xl"
                src={imgCard}
                width={270}
                />
            </CardBody>
            </Card>
            {/* <Card className="py-4 m-1">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Acciones con Tips</p>
                <small className="text-default-500">Obtené tips para lograr realizar las acciones</small>
                <p className="font-bold text-large">Ayuda para lograr los objetivos</p>
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
                <p className="font-bold text-large">Construir un mundo mejor</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={worldCard}
                width={270}
                />
            </CardBody>
            </Card> */}
            {/* </div> */}
    </>
  );
}

export default VerticalCard;