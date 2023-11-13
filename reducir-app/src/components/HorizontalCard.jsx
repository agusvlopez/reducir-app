import React, { useEffect, useState } from "react";
import {Card, CardBody, Image, Button, Spinner} from "@nextui-org/react";
import {HeartIcon} from "./HeartIcon";
import { Link } from "react-router-dom";
import { selectFavoriteAction, addFavoriteAction, setLoading, setFavorites, selectLoading, addFavorite } from "../features/favoritesSlice";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/authContext";
import { useFavContext } from "../context/FavsContext";
import { data } from "autoprefixer";
import { db } from "../firebase/firebase.config";
import { collection, doc, getDoc, getDocs, limit, onSnapshot, query, updateDoc, where } from "firebase/firestore";


//esta data se va a sacar de la base de datos.

export default function HorizontalCard({
  titleCard,
  descriptionCard,
  imageCard,
  categoryCard,
  actionId
}
) {
  // // const [userLoading, setUserLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState({});

  // const favorites = useSelector(selectFavoriteAction);
  const dispatch = useDispatch();
  const auth = useAuth();
  let userId = auth.user.uid;
  console.log(userId);

  const state = useSelector(selectFavoriteAction);
  const loading = useSelector(selectLoading);
  console.log(state);

  const isActionLiked = state?.some((s) => s.actionId === actionId);

  useEffect(() => {
    dispatch(setLoading(true));

    console.log("Entre al useEffect del HorizontalCard");

    const userRef = doc(db, `users/${userId}`);
  
    // Utiliza onSnapshot para suscribirte al documento del usuario
    const unsubscribeUser = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        // Si el documento existe, accede al campo deseado (en este caso, "favorites")
        const favorites = docSnapshot.data()["favorites"] || [];
        dispatch(setFavorites(favorites));
        dispatch(setLoading(false));
      }      
    });

    return () => {
      // Desuscribirse cuando el componente se desmonte
      unsubscribeUser();
    };
  }, [userId, dispatch]);
  
  const handleFavorite = async () => {
    console.log("Estado antes de agregar favorito:", state);
        //  // Realizar la operación asíncrona antes de despachar el action
        //  const usersRef = doc(db, `users/${userId}`);
        //  const docSnapshot = await getDoc(usersRef);
    
        //  if (docSnapshot.exists()) {
        //    const favoritesArray = docSnapshot.data()["favorites"];
    
        //    const isActionInFavorites = favoritesArray.some(
        //      (objeto) => objeto.actionId === actionId
        //    );
    
        //    const updatedFavorites = isActionInFavorites
        //      ? favoritesArray.filter((objeto) => objeto.actionId !== actionId)
        //     : [...favoritesArray, { titleCard, descriptionCard, imageCard, categoryCard, actionId }];
    
        //    await updateDoc(usersRef, {
        //      "favorites": updatedFavorites,
        //    });
        //    dispatch(setFavorites(updatedFavorites));
        //   }
      dispatch(addFavorite({
        titleCard,
        descriptionCard,
        imageCard,
        categoryCard,
        actionId,
        userId
      }));
      console.log("Loading after dispatch:", loading);

     console.log("Estado despues de agregar favorito:", state);
  }

  if(loading){
    return (
      <>
      <div className="flex justify-center">
        <Spinner color="default" />
      </div>
      </>
    )
  }
  else {

  return (
    <>
    <Card
      isBlurred
      className="border-none backgroundWhite/90 dark:bg-default-100/50 max-w-[610px] mx-auto mb-4"
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
              src={imageCard}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0"> 
                <p className="text-large font-medium mt-2">{titleCard}</p>
                <p className="text-small text-foreground/80">{descriptionCard}</p>
                <p className="font-semibold text-foreground/90">{categoryCard}</p>
                <Link to={`/accion/${actionId}`} className="font-bold">Leer más</Link>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 mt-2"
                radius="full"
                variant="light"
                onPress={handleFavorite}
              >
                <HeartIcon
                  className={isActionLiked ? "[&>path]:stroke-transparent" : ""}
                  fill={isActionLiked ? "currentColor" : "none"}
                />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
      
    </Card>
    </>
  );
  }
}

