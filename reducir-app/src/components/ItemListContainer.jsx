import { Link, useParams } from "react-router-dom";
import HorizontalCard from "./HorizontalCard";
import { Chip, Spinner } from "@nextui-org/react";
import { useGetActionsQuery } from "../features/fetchFirebase";

const MAX_DESCRIPTION_LENGTH = 150;

const ItemListContainer = () => {
    const { data: actionsData, isLoading: actionsLoading, isError: actionsError } = useGetActionsQuery();
    const { categoria: category } = useParams();

    const filteredActions = actionsData?.filter(action => !category || action.category === category);

    return (
        <>   
        <section className="backgroundTrama min-h-screen rounded-t-[30px] p-2 pb-8 mx-auto container">
            <div className="flex gap-2 pt-4 pb-4 container mx-auto justify-center">
                <Link to="/acciones">
                    <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Todas</Chip>
                </Link>
                <Link to="/acciones/energia">
                    <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Energía</Chip>
                </Link>
                <Link to="/acciones/reciclaje">
                    <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Reciclaje</Chip>
                </Link>
                <Link to="/acciones/agua">
                    <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Agua</Chip>
                </Link>
            </div>  
            <div className="mb-8 mt-4">
            {actionsLoading &&
                <div className="flex justify-center">
                    <Spinner color="default" />
                </div>
            }
            {filteredActions?.map((action) => (
            <HorizontalCard
                key={action.id}
                titleCard={action.title}
                descriptionCard={action.description.length > MAX_DESCRIPTION_LENGTH ?
                    action.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..." :
                    action.description
                }
                imageCard={action.image}
                categoryCard={
                    category === "energia" ? "energía" : action.category
                  } 
                actionId={action.id}
                carbonCard={action.carbon}
            />               
            ))}
            </div>
        </section>       
        </>
    )
}

export default ItemListContainer;