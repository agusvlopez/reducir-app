import React, { useState } from "react";
import { Menu } from "../components/Menu";
import { HeartIcon } from "../components/HeartIcon";
import { Button, Chip, Spinner } from "@nextui-org/react";
import Sidebar from "../components/Sidebar";
import NavbarWeb from "../components/NavbarWeb";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ChipArrow from "../components/ChipArrow";
import { useCreateAchievementsMutation, useCreateCarbonMutation, useCreateFavoritesMutation, useDeleteFavoriteMutation, useGetAchievementsQuery, useGetActionQuery, useGetCarbonQuery, useGetFavoritesQuery } from "../features/fetchFirebase";

export function Action() {
  const { idAccion: actionId } = useParams();
  const auth = useAuth();
  const userId = auth?.user?.uid;
  console.log(actionId);

  const [createFavorites] = useCreateFavoritesMutation();
  const [createAchievements] = useCreateAchievementsMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [createCarbon] = useCreateCarbonMutation();

  const { data: actionData, isLoading: actionLoading, isError: actionError } = useGetActionQuery(actionId);
  const { data: carbonData, isLoading: carbonLoading, isError: carbonError } = useGetCarbonQuery(userId);
  const { data: favoritesData, isLoading: favoritesLoading, isError: favoritesError } = useGetFavoritesQuery(userId);
  const { data: achievementsData, isLoading: achievementsLoading, isError, achivementsError } = useGetAchievementsQuery(userId);

  const isActionLiked = favoritesData?.favorites.find((s) => s.actionId == actionId);
  const isAchievementAdded = achievementsData?.find((a) => a.id == actionId);
  console.log(achievementsData);

  const [likedAction, setLikedAction] = useState(isActionLiked);
  const [addedAchievement, setAddedAchievement] = useState(isAchievementAdded);


  const handleFavorite = async () => {
    const newFavorite = {
      titleCard: actionData?.title || '',
      descriptionCard: actionData?.description || '',
      tipCard: actionData?.tip || '',
      imageCard: actionData?.image || '',
      altCard: actionData?.alt || '',
      categoryCard: actionData?.category || '',
      actionId,
      userId,
      carbonCard: actionData?.carbon || '',
      pointsCard: actionData?.points || '',
    };

    setLikedAction(newFavorite);

    try {
      if (isActionLiked) {
        setLikedAction(false);
        const deleted = await deleteFavorite({
          userId,
          actionId,
        });
        console.log(deleted);

      } else {
        setLikedAction(newFavorite);
        const result = await createFavorites(newFavorite);
      }

    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const addAsAchievement = async () => {

    const newAchievement = {
      title: actionData?.title || '',
      description: actionData?.description || '',
      tip: actionData?.tip || '',
      image: actionData?.image || '',
      alt: actionData?.alt || '',
      category: actionData?.category || '',
      carbon: actionData?.carbon || '',
      points: actionData?.points || '',
      userId,
      actionId
    };

    setAddedAchievement(newAchievement);

    try {
      const result = await createAchievements(newAchievement);
      const favorite = {
        userId: result.data.userId,
        actionId: result.data.actionId,
      }
      const isActionInFavorites = favoritesData?.favorites.some((f) => f.actionId == actionId);

      if (isActionInFavorites) {
        const updatedFavorites = favoritesData?.favorites.filter((f) => f.actionId !== actionId);
        const deleteAchievementResult = await deleteFavorite(favorite);
        //setLikedAction(false);
      }

    } catch (error) {
      console.error("Error adding achievement:", error);
    }

    const newCarbonValue = carbonData - actionData?.carbon;

    createCarbon({
      userId: userId,
      carbon: newCarbonValue,
    });

  };

  return (
    <>
      <div className="lg:flex">
        <template className="hidden lg:block">
          <Sidebar />
        </template>

        <div className="flex-1">
          <div className="container p-6 mx-auto">
            <h1 className="mb-2">{actionData?.title}</h1>
          </div>
          <section className="backgroundTrama min-h-screen rounded-t-[30px] p-4 pb-8 mx-auto">
            {actionLoading ?
              <div className="flex justify-center">
                <Spinner color="default" />
              </div>
              :
              <div className="mb-8 mt-4">
                <div className="backgroundWhite p-4 rounded-xl shadow-sm lg:flex gap-4">
                  <img src={actionData?.image} alt={actionData?.alt} className="max-h-72 rounded-lg mt-2" />
                  <div className="mt-2 p-2">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p><Chip className="shadow-md backgroundDarkGreen text-white" size="sm">{actionData?.category}</Chip></p>
                      <p className="text-foreground/90 "><ChipArrow> -{actionData?.carbon} kg CO2 </ChipArrow></p>
                    </div>
                    <p className="mb-3 mt-3">{actionData?.description}</p>
                    <div className="mb-2 border-2 border-transparent rounded-xl border-s-orange-600 p-2 backgroundSoftOrange font-semibold text-orange-800 italic"><span className="iconTip"><span className="invisible">Tip:</span></span> {actionData?.tip}</div>

                    <div className="flex justify-end pt-2">
                      {!addedAchievement ?
                        <>
                          <Button onClick={addAsAchievement} className="backgroundDarkGreen text-white">Agregar como logro +</Button>

                          <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 mt-2 mr-2"
                            radius="full"
                            variant="light"
                            onPress={handleFavorite}
                          >

                            <HeartIcon
                              className={likedAction ? "[&>path]:stroke-transparent" : "animate__bounceIn  animate__delay-2s"}
                              fill={likedAction ? "currentColor" : "none"}
                            />

                          </Button>

                        </>
                        :
                        <div>
                          <p className="font-semibold text-center text-sm"><span className="iconAchievement"><span className="invisible">Acción lograda</span></span></p>
                        </div>
                      }
                    </div>
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
