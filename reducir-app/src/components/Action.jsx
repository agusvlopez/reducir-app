import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, getDoc, query, where, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Menu} from "./Menu";
import RecycleImg from "../covers/actions/recycle.jpg";  
import {HeartIcon} from "./HeartIcon";
import { Button, Spinner } from "@nextui-org/react";
import Sidebar from "./Sidebar";
import NavbarWeb from "./NavbarWeb";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/authContext";
import { addFavorite, selectFavoriteAction, selectLoading, setFavorites, setLoading } from "../features/favoritesSlice";

export function Action () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingDocument, setLoadingDocument] = useState(true);
    const [existingAchievement, setExistingAchievement] = useState(false);
    const [action, setAction] = useState({});
    const favorites = useSelector(selectFavoriteAction);
    const loading = useSelector(selectLoading);
    
    let titleCard = action.title;
    let descriptionCard = action.description;
    let imageCard = action.image;
    let categoryCard = action.category;
    let carbonCard = action.carbon;

    // const collectionRef = collection(db, "actions")
    const actionId = useParams().idAccion;
    const auth = useAuth();
    const userId = auth.user.uid;

    const isActionLiked = favorites?.some((s) => s.actionId === actionId);
   
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
           
            const actionRef = doc(db, `actions/${actionId}`);

            try 
            {
              const actionDoc = await getDoc(actionRef);            
              const achievementsCollectionRef = collection(userRef, 'achievements');

              // Verificar si la acción ya existe en la colección "achievements"
              const existingAchievementQuery = query(
                achievementsCollectionRef,
                where('titleCard', '==', actionDoc.data().title),
              );
              const existingAchievementSnapshot = await getDocs(existingAchievementQuery);

              if (!existingAchievementSnapshot.empty) {
                setExistingAchievement(true);
                return;
              }
              dispatch(setLoading(false));  
            }
            catch(err){
              console.log(err);
            }

          }  
            
        });
        
        const getDocument = async () => {
            const actionRef = doc(db, `actions/${actionId}`);
      
            try {
              const docSnapshot = await getDoc(actionRef);
      
              if (docSnapshot.exists()) {
                console.log('Document data:', docSnapshot.data());
                // Aquí puedes actualizar el estado con los datos del documento
                setAction(docSnapshot.data());
              } else {
                console.log('No such document!');
              }
            } catch (error) {
              console.error('Error fetching document:', error);
            } finally {
              // Asegúrate de que setLoading se ejecute solo si el componente aún está montado
              // Puedes utilizar una referencia mutable para verificar esto
             
                setLoadingDocument(false);  
            }
          };
      
          // Utiliza una referencia mutable para rastrear si el componente está montado
          // const mounted = { current: true };
      
          getDocument();
      
          // La función de limpieza se ejecutará cuando el componente se desmonte
          return () => {
           
            // mounted.current = false;
            unsubscribeUser();
          };
      
    }, [actionId, userId, dispatch])
  
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

      }

      const addAsAchievement = async () => {
        const userDocRef = doc(db, `users/${userId}`);
        const achievementsCollectionRef = collection(userDocRef, 'achievements');

        // Verificar si la acción ya existe en la colección "achievements"
        const existingAchievementQuery = query(
          achievementsCollectionRef,
          where('titleCard', '==', action.title),
        );

        const existingAchievementSnapshot = await getDocs(existingAchievementQuery);

        if (!existingAchievementSnapshot.empty) {
          setExistingAchievement(true);
          console.log('La acción ya existe en achievements. No se agregará nuevamente.');
          return;
        }
        
        const newAchievement = {
          titleCard: action.title,
          descriptionCard: action.description,
          imageCard: action.image,
          categoryCard: action.category,
          carbonCard: action.carbon,
        };
      
        // Agregar un nuevo documento a la colección "achievements"
        const newAchievementRef = await addDoc(achievementsCollectionRef, newAchievement);
        console.log(`Nuevo logro agregado con ID: ${newAchievementRef.id}`);
        
        const isActionInFavorites = favorites.some((f) => f.actionId === actionId);

        if (isActionInFavorites) {
          // Eliminar la acción de la colección "favorites"
          const updatedFavorites = favorites.filter((f) => f.actionId !== actionId);
          dispatch(setFavorites(updatedFavorites));
          
          // Actualizar el documento del usuario con los nuevos "favorites"
          await updateDoc(userDocRef, { favorites: updatedFavorites });
        }
      
        console.log('Logro agregado y acción eliminada de "favorites" correctamente.');
        
        // Restar el valor de carbono del logro al valor actual del usuario
        const userSnapshot = await getDoc(userDocRef);
        const currentUserData = userSnapshot.data();
        const currentCarbon = currentUserData.carbon || 0;
        const carbonAchievement = newAchievement.carbonCard || 0;
      
        const newCarbon = currentCarbon - carbonAchievement;
      
        // Actualizar el campo "carbon" del documento del usuario con el nuevo valor
        await updateDoc(userDocRef, { carbon: newCarbon });
      
        console.log('Logro agregado y carbono actualizado correctamente.');
        setExistingAchievement(true);
      };


    return (
    <>
        <div className="lg:flex">
            <template className="hidden lg:block">
                <Sidebar />
            </template>

            <div className="flex-1">
            <NavbarWeb></NavbarWeb>

                <div className="container p-4 mx-auto">
                    <h1 className="mb-2 ">{action.title}</h1>
                </div>

                <section className="backgroundDarkGreen min-h-screen rounded-t-[30px] p-4 pb-8 mx-auto">
                {loadingDocument ?
                <div className="flex justify-center">
                    <Spinner color="default" />
                </div>
                :
                <div className="mb-8 mt-4">
                    <div className="backgroundWhite p-4 rounded-xl shadow-sm lg:flex gap-4">     
                    <img src={action.image} alt="" className="max-h-72 rounded-lg" />    
                    <div className="mt-2">
                        <p className="mb-2"><span className="font-bold">Categoría:</span> {action.category}</p>
                        <p>{action.description}</p>
                        <div className="flex justify-end">   
                        {!existingAchievement ? 
                            <Button
                                isIconOnly
                                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 mt-2 mr-2"
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
                        {!existingAchievement && 
                         <Button onClick={addAsAchievement} className="backgroundDarkGreen text-white">Agregar como logro +</Button>
                        }
                    </div>
                    </div>
                </div>
                }
                </section>
            </div>
        </div>
        <div className="mt-8 block lg:hidden">
            <Menu></Menu>
        </div>
    </>
    );
}
