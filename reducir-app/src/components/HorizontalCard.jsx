import React, { useState } from "react";
import { Card, CardBody, Image, Button, Spinner, Chip } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ChipArrow from "./ChipArrow";
import { useCreateFavoritesMutation, useDeleteFavoriteMutation, useGetAchievementsPostsQuery, useGetAchievementsQuery, useGetActionQuery, useGetFavoritesQuery, useGetUserQuery } from "../features/fetchFirebase";

export default function HorizontalCard({
  titleCard,
  descriptionCard,
  imageCard,
  categoryCard,
  actionId,
  carbonCard,
  onFavoriteToggle,
}
) {
  //const auth = useAuth();
  //let userId = auth.user.uid;
  const { accountId } = useParams();
  const [createFavorites] = useCreateFavoritesMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const { data: accountData, isLoading: accountIsLoading, isError: accountIsError } = useGetUserQuery(accountId);
  const { data: actionData, isLoading: actionLoading, isError: actionError } = useGetActionQuery(actionId);

  const { data: achievementsData, isLoading: achievementsLoading, isError, achivementsError } = useGetAchievementsQuery(accountId);
  const { data: favoritesData, isLoading: favoritesLoading, isError: favoritesError } = useGetFavoritesQuery(accountId);
  const { data: achievementsPosts, isLoading: achievementsPostsLoading, isError: achievementsPostsIsError, achievementsPostsError } = useGetAchievementsPostsQuery();
  console.log("actionData", actionData);

  const accountEmail = accountData?.account.email;
  const isAchievementAdded2 = achievementsPosts?.find((a) => a.email == accountEmail && a.achievement == actionData?.title);
  console.log("achievementsPosts", achievementsPosts);

  const isActionLiked = accountData?.account.favorites.find((s) => s._id === actionId);
  const isAchievementAdded = accountData?.account.achievements.find((a) => a._id === actionId);
  console.log("accountData", accountData);
  console.log("isAchievementAdded2", isAchievementAdded2);
  console.log("isAchievementAdded", isAchievementAdded);

  const [likedAction, setLikedAction] = useState(isActionLiked);
  const [addedAchievement, setAddedAchievement] = useState(isAchievementAdded2);
  console.log("addedAchievement", addedAchievement);

  const handleFavorite = async () => {
    const newFavorite = {
      _id: actionData?._id,
      title: actionData?.title || '',
      description: actionData?.description || '',
      tipCard: actionData?.tip || '',
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
        const deleted = await deleteFavorite({
          accountId,
          actionId,
        });

        setLikedAction(false);
        onFavoriteToggle(false);
      } else {
        const result = await createFavorites({ accountId, newFavorite });

        setLikedAction(newFavorite);
        onFavoriteToggle(true);
      }

    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  return (
    <>

      <Card
        isBlurred
        className="border-none backgroundWhite/90 dark:bg-default-100/50 max-w-[610px] mx-auto mb-4"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-4 justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover mt-2"
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
                  <p className="mt-1 mb-2 font-semibold text-foreground/90"><Chip className="shadow-md backgroundDarkGreen text-white" size="sm">{categoryCard === "energia" ? "energía" : categoryCard}</Chip></p>
                  <p className="text-small text-foreground/80">{descriptionCard}</p>
                  <p className="text-foreground/90 mt-4"><ChipArrow> -{carbonCard} kg CO2 </ChipArrow></p>
                  <div className="flex justify-end">
                    <Link to={`/accion/${actionId}`} className="textDarkGreen font-bold flex items-center">Leer más</Link>
                  </div>
                </div>
                {!addedAchievement && !isAchievementAdded2 ?
                  <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 mt-2"
                    radius="full"
                    variant="light"
                    onPress={handleFavorite}
                  >
                    <HeartIcon
                      className={likedAction ? "[&>path]:stroke-transparent" : "animate__bounceIn"}
                      fill={likedAction ? "currentColor" : "none"}
                    />
                  </Button>
                  :
                  <div>
                    <p className="font-semibold text-center text-sm"><span className="iconAchievement"><span className="invisible">Acción lograda</span></span></p>
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


