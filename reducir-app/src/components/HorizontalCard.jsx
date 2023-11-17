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
  actionId,
  carbonCard
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
  const [existingAchievement, setExistingAchievement] = useState(false);
  const state = useSelector(selectFavoriteAction);
  const loading = useSelector(selectLoading);
  console.log(state);

  const isActionLiked = state?.some((s) => s.actionId === actionId);

  useEffect(() => {
    dispatch(setLoading(true));

    console.log("Entre al useEffect del HorizontalCard");

    const userRef = doc(db, `users/${userId}`);
  
    // Utiliza onSnapshot para suscribirte al documento del usuario
    const unsubscribeUser = onSnapshot(userRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {       
        
        // Si el documento existe, accede al campo deseado (en este caso, "favorites")
        const favorites = docSnapshot.data()["favorites"] || [];
        dispatch(setFavorites(favorites));
        dispatch(setLoading(false));

        const achievementsCollectionRef = collection(userRef, 'achievements');

        // Verificar si la acción ya existe en la colección "achievements"
        const existingAchievementQuery = query(
          achievementsCollectionRef,
          where('titleCard', '==', titleCard),
        );
        const existingAchievementSnapshot = await getDocs(existingAchievementQuery);

        if (!existingAchievementSnapshot.empty) {
          setExistingAchievement(true);
          console.log('La acción ya existe en achievements. No se agregará nuevamente.');
          return;
        }

      }      
    });

    return () => {
      // Desuscribirse cuando el componente se desmonte
      unsubscribeUser();
    };
  }, [userId, dispatch]);
  
  const handleFavorite = async () => {

      dispatch(addFavorite({
        titleCard,
        descriptionCard,
        imageCard,
        categoryCard,
        actionId,
        userId,
        carbonCard
      }));
      console.log("Loading after dispatch:", loading);

     console.log("Estado despues de agregar favorito:", state);
  }


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
                <p className="mt-2 font-semibold text-foreground/90">Categoría: {categoryCard}</p>
                <p className="font-semibold text-foreground/90">-{carbonCard} kg CO2 </p>
                <div className="flex justify-end">
                  <Link to={`/accion/${actionId}`} className="font-bold">Leer más</Link>
                </div>
              </div>
              {!existingAchievement ?
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
              :
              <div>
               <p className="font-semibold text-center text-sm"> Acción lograda</p>
              </div>
            }
            </div>
          </div>
        </div>
      </CardBody>
      
    </Card>
    </>
  );
  }


