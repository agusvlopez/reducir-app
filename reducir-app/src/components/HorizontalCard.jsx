import React from "react";
import {Card, CardBody, Image, Button} from "@nextui-org/react";
import {HeartIcon} from "./HeartIcon";
import RecycleImg from "../covers/actions/recycle.jpg";  
import { Link } from "react-router-dom";
//esta data se va a sacar de la base de datos.

export default function HorizontalCard() {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card
      isBlurred
      className="border-none backgroundWhite/90 dark:bg-default-100/50 max-w-[610px] mx-auto"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={100}
              shadow="md"
              src={RecycleImg}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0"> 
                <p className="text-large font-medium mt-2">Separar la basura</p>
                <p className="text-small text-foreground/80">Separar la basura adecuadamente es una forma importante de contribuir al cuidado del medio ambiente y al reciclaje.</p>
                <p className="font-semibold text-foreground/90">Categoría: Reciclaje</p>
                <Link to="/accion/:idAccion" className="font-bold">Leer más</Link>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 mt-2"
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
          </div>
        </div>
      </CardBody>
      
    </Card>
  );
}
