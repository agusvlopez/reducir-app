import React, { useState } from "react";
import { Menu } from "./Menu";
import { HeartIcon } from "./HeartIcon";
import { Button, Chip, Popover, PopoverContent, Spinner } from "@nextui-org/react";
import Sidebar from "./Sidebar";
import NavbarWeb from "./NavbarWeb";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ChipArrow from "./ChipArrow";
import { useCreateAchievementsMutation, useCreateCarbonMutation, useCreateFavoritesMutation, useDeleteFavoriteMutation, useGetAchievementsPostsQuery, useGetAchievementsQuery, useGetActionQuery, useGetCarbonQuery, useGetFavoritesQuery, useGetUserQuery } from "../features/fetchFirebase";
import FloatingPopover from "./FloatingPopover";

export function Action() {
  const { actionId } = useParams();
  const accountId = localStorage.getItem('_id');
  const { data: accountData, isLoading: accountIsLoading, isError: accountIsError } = useGetUserQuery(accountId);

  const [createFavorites] = useCreateFavoritesMutation();
  const [createAchievements] = useCreateAchievementsMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [createCarbon] = useCreateCarbonMutation();

  const { data: actionData, isLoading: actionLoading, isError: actionError } = useGetActionQuery(actionId);
  const { data: carbonData, isLoading: carbonLoading, isError: carbonError } = useGetCarbonQuery(accountId);
  const { data: favoritesData, isLoading: favoritesLoading, isError: favoritesError } = useGetFavoritesQuery(accountId);
  const { data: achievementsData, isLoading: achievementsLoading, isError, achivementsError } = useGetAchievementsQuery(accountId);
  const { data: achievementsPosts, isLoading: achievementsPostsLoading, isError: achievementsPostsIsError, achievementsPostsError } = useGetAchievementsPostsQuery();
  const accountEmail = accountData?.account.email;
  const isAchievementAdded2 = achievementsPosts?.find((a) => a.email === accountEmail && a.achievement === actionData?.title);
  const isActionLiked = accountData?.account.favorites.find((s) => s._id === actionId);
  const isAchievementAdded = accountData?.account.achievements.find((a) => a._id === actionId);

  console.log("accountData", accountData);
  console.log("achievementsData", achievementsData);
  console.log("achievementsPosts", achievementsPosts);
  console.log("isAchievementAdded2", isAchievementAdded2);
  const newCarbonValue = carbonData?.carbon - actionData?.carbon;
  const [likedAction, setLikedAction] = useState(isActionLiked);
  const [addedAchievement, setAddedAchievement] = useState(isAchievementAdded2);
  const [popUpFavoriteAdded, setPopUpFavoriteAdded] = useState(false);
  const [popUpFavoriteDeleted, setPopUpFavoriteDeleted] = useState(false);
  const [popUpAchievementAdded, setPopUpAchievementAdded] = useState(false);
  console.log("accountData", accountData);

  const favoriteAdded = {
    title: "¡Acción agregada a favoritos!"
  }
  const favoriteDeleted = {
    title: "Se quitó la acción de favoritos."
  }

  const achievementAdded = {
    title: "¡Acción agregada a logros!"
  }

  const handleFavorite = async () => {
    if (!isActionLiked) {
      setPopUpFavoriteDeleted(false);
      setPopUpFavoriteAdded(true);
    }

    const newFavorite = {
      _id: actionData?._id,
      title: actionData?.title || '',
      description: actionData?.description || '',
      tip: actionData?.tip || '',
      image: actionData?.image || '',
      alt: actionData?.alt || '',
      category: actionData?.category || '',
      actionId,
      accountId,
      carbon: actionData?.carbon || '',
      points: actionData?.points || '',
    };

    setLikedAction(newFavorite);

    try {
      if (isActionLiked) {
        setPopUpFavoriteDeleted(true);
        setPopUpFavoriteAdded();
        const deleted = await deleteFavorite({
          accountId,
          actionId,
        });

        setLikedAction(false);

      } else {
        const result = await createFavorites({ accountId, newFavorite });
        setLikedAction(newFavorite);
      }

    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
    setTimeout(() => {
      setPopUpFavoriteAdded(false);
      setPopUpFavoriteDeleted(false);
    }, 3000);
  };

  // const addAsAchievement = async () => {

  //   const newAchievement = {
  //     _id: actionData?._id,
  //     title: actionData?.title || '',
  //     description: actionData?.description || '',
  //     tip: actionData?.tip || '',
  //     image: actionData?.image || '',
  //     alt: actionData?.alt || '',
  //     category: actionData?.category || '',
  //     actionId,
  //     accountId,
  //     carbon: actionData?.carbon || '',
  //     points: actionData?.points || '',
  //   };

  //   setAddedAchievement(newAchievement);

  //   try {
  //     const result = await createAchievements(newAchievement);

  //     setPopUpAchievementAdded(true);
  //     setTimeout(() => {
  //       setPopUpAchievementAdded(false);
  //     }, 3000);

  //     const favorite = {
  //       accountId: result.data.accountId,
  //       actionId: result.data.actionId,
  //     }
  //     const isActionInFavorites = favoritesData?.favorites.some((f) => f._id === actionId);

  //     if (isActionLiked) {
  //       const actionDeleted = {
  //         accountId,
  //         actionId
  //       }
  //       const deleted = await deleteFavorite(actionDeleted);
  //       setLikedAction(false);
  //     }

  //     const newCarbonValue = carbonData?.carbon - actionData?.carbon;

  //     const newCarbon = {
  //       accountId,
  //       carbon: {
  //         carbon: newCarbonValue
  //       }
  //     };

  //     if (newCarbonValue) {
  //       const result = await createCarbon(newCarbon);

  //     }

  //   } catch (error) {
  //     console.error("Error adding achievement:", error);
  //   }

  // };

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
                      {!addedAchievement && !isAchievementAdded2 ?
                        <>

                          <Link to={`/logros/${accountId}/new/${actionData?._id}`} className="">
                            <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors motion-reduce:transition-none bg-default backgroundDarkGreen text-white"> Agregar como logro +</button>
                          </Link>

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
            {popUpFavoriteAdded &&
              <div className="relative z-0">
                <FloatingPopover content={favoriteAdded} className="fixed bottom-4 right-4" />
              </div>
            }
            {popUpFavoriteDeleted &&
              <div className="relative z-0">
                <FloatingPopover content={favoriteDeleted} className="fixed bottom-4 right-4" />
              </div>
            }
            {popUpAchievementAdded &&
              <div className="relative z-0">
                <FloatingPopover content={achievementAdded} className="fixed bottom-4 right-4" />
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
