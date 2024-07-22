import { Link, useParams } from "react-router-dom";
import HorizontalCard from "./HorizontalCard";
import { Chip, Spinner } from "@nextui-org/react";
import { useGetActionsQuery } from "../features/fetchFirebase";
import FloatingPopover from "./FloatingPopover";
import { useState } from "react";

const MAX_DESCRIPTION_LENGTH = 150;

const ItemListContainer = () => {
    const { data: actionsData, isLoading: actionsLoading, isError: actionsError } = useGetActionsQuery();
    const { categoria: category } = useParams();
    const accountId = localStorage.getItem('_id');
    const filteredActions = actionsData?.filter(action => !category || action.category === category);
    const [popUpFavoriteAdded, setPopUpFavoriteAdded] = useState(false);
    const [popUpFavoriteDeleted, setPopUpFavoriteDeleted] = useState(false);

    const favoriteAdded = {
        title: "¡Acción agregada a favoritos!"
    }
    const favoriteDeleted = {
        title: "Se quitó la acción de favoritos."
    }

    const handleFavoriteToggle = (isAdded) => {
        if (isAdded) {
            setPopUpFavoriteAdded(true);
            setTimeout(() => setPopUpFavoriteAdded(false), 3000);
        } else {
            setPopUpFavoriteDeleted(true);
            setTimeout(() => setPopUpFavoriteDeleted(false), 3000);
        }
    };

    return (
        <>
            <section className="backgroundTrama min-h-screen rounded-t-[30px] p-4 pb-8 mx-auto">
                <div className="flex gap-2 pt-4 pb-4 container mx-auto justify-center">
                    <Link to={`/acciones/${accountId}`}>
                        <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Todas</Chip>
                    </Link>
                    <Link to={`/acciones/${accountId}/energia`}>
                        <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Energía</Chip>
                    </Link>
                    <Link to={`/acciones/${accountId}/reciclaje`}>
                        <Chip size="md" className="cursor-pointer hover:drop-shadow-2xl">Reciclaje</Chip>
                    </Link>
                    <Link to={`/acciones/${accountId}/agua`}>
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
                            key={action?._id}
                            titleCard={action?.title}
                            descriptionCard={action.description?.length > MAX_DESCRIPTION_LENGTH ?
                                action.description?.slice(0, MAX_DESCRIPTION_LENGTH) + "..." :
                                action.description
                            }
                            imageCard={action?.image}
                            categoryCard={
                                category === "energia" ? "energía" : action?.category
                            }
                            actionId={action?._id}
                            carbonCard={action?.carbon}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))}
                </div>
                {popUpFavoriteAdded && (
                    <div className="fixed bottom-12 right-4 z-50 w-[50%]">
                        <FloatingPopover content={favoriteAdded} />
                    </div>
                )}
                {popUpFavoriteDeleted && (
                    <div className="fixed bottom-12 right-4 z-50 w-[50%]">
                        <FloatingPopover content={favoriteDeleted} />
                    </div>
                )}
            </section>
        </>
    )
}

export default ItemListContainer;