import React, { useState } from "react";
import {Card, CardBody, Image, Button} from "@nextui-org/react";
import {HeartIcon} from "./HeartIcon";
import RecycleImg from "../covers/actions/recycle.jpg";  
import { Link } from "react-router-dom";
import { selectFavoriteAction, addFavoriteAction, addDocument, deleteFavoriteAction } from "../features/favoritesSlice";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/authContext";
import { useFavContext } from "../context/FavsContext";
import { data } from "autoprefixer";
import { db } from "../firebase/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { addToFavorites, subscribeToUser } from "../services/users";

//esta data se va a sacar de la base de datos.

export default function HorizontalCard({
  titleCard,
  descriptionCard,
  imageCard,
  categoryCard,
  actionId
}
) {
//   newMessage: {
//     message: '',
// },
// messagesLoading: true,
// messages: [],
  // const [newMessage, setNewMessage] = ("");
  // const [messagesLoading, setMessagesLoading] = (true);
  // const [messages, setMessages] = useState([]);
   const [liked, setLiked] = useState({});
  // // const [userLoading, setUserLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState({});

  // const favorites = useSelector(selectFavoriteAction);

  const dispatch = useDispatch();
  const auth = useAuth();
  let userId = auth.user.uid;
  console.log(userId);


  const handleFavorite = async () => {
    setLiked((v) => !v);

    // addToFavorites(setUser((newUser) => user = newUser ));
    
    // await subscribeToUser({
    //   userId: userId,
    // },
    // (newMessages) => this.messages = newMessages);

    dispatch(addFavoriteAction({
      titleCard,
      descriptionCard,
      imageCard,
      categoryCard,
      actionId,
      userId
    }));
  
  
    
    //   category: categoryCard,
    //   description: descriptionCard,
    //   image: imageCard,
    //   title: titleCard,
    //   userId: userId
    // }));
  }

  console.log(liked);
  return (
    <>
    <Card
      isBlurred
      className="border-none backgroundWhite/90 dark:bg-default-100/50 max-w-[610px] mx-auto"
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
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
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
