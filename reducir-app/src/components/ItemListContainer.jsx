import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import HorizontalCard from "./HorizontalCard";
import { Chip, Spinner } from "@nextui-org/react";

const MAX_DESCRIPTION_LENGTH = 150;

const ItemListContainer = () => {

    const [actions, setActions] = useState([]);
    // const [title, setTitle] = useState("Actions");
    const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga

    const category = useParams().categoria;

    console.log(category);
    useEffect(() => {

        const actionsRef = collection(db, "actions");

        const q = category ? query(actionsRef, where("category", "==", category)) : actionsRef;
        getDocs(q)
        .then((res) => {
            console.log(res.docs[0]?.data());

            setActions(
                res.docs.map((doc) => {
                    return {...doc?.data(), id: doc.id }
                })
            );
            setLoading(false); // Cuando los datos se cargan, actualiza el estado de carga
        });
    }, [category])


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
            {loading &&
                <div className="flex justify-center">
                    <Spinner color="default" />
                </div>
            }
            {actions.map((action) => (
            <HorizontalCard
                key={action.id}
                titleCard={action.title}
                descriptionCard={action.description.length > MAX_DESCRIPTION_LENGTH ?
                    action.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..." :
                    action.description
                }
                imageCard={action.image}
                categoryCard={action.category}
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