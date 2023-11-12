import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import HorizontalCard from "./HorizontalCard";
import { Chip } from "@nextui-org/react";

const ItemListContainer = () => {

    const [actions, setActions] = useState([]);
    // const [title, setTitle] = useState("Actions");

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
        });
    }, [category])

    return (
        <>   
        <section className="backgroundDarkGreen min-h-screen rounded-t-lg p-2 pb-8 mx-auto container">
            <div className="flex gap-2 pt-4 pb-4 container mx-auto justify-center">
                <Link to="/acciones">
                    <Chip size="md"  className="cursor-pointer">Todas</Chip>
                </Link>
                <Link to="/acciones/energia">
                    <Chip size="md" className="cursor-pointer">Energía</Chip>
                </Link>
                <Link to="/acciones/reciclaje">
                    <Chip size="md" className="cursor-pointer">Reciclaje</Chip>
                </Link>
                <Link to="/acciones/agua">
                    <Chip size="md" className="cursor-pointer">Agua</Chip>
                </Link>
            </div>  
            <div className="mb-8 mt-4">
            {actions.map((action) => (
            <HorizontalCard
                key={action.id}
                titleCard={action.title}
                descriptionCard={action.description}
                imageCard={action.image}
                categoryCard={action.category}
                actionId={action.id}
            />               
            ))}
            </div>
        </section>       
        </>
    )
}

export default ItemListContainer;