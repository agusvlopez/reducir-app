import React, { useEffect, useState } from "react";
import { Menu } from "./Menu";
import RecycleImg from "../covers/actions/recycle.jpg";  
import { Button, Chip, Spinner } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavbarWeb from "./NavbarWeb";
import { useAuth } from "../context/authContext";
import { db } from "../firebase/firebase.config";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import ChipArrow from "./ChipArrow";
import { useGetAchievementsQuery } from "../features/fetchFirebase";

export function Achievements () {
    const [message, setMessage] = useState("");
    const auth = useAuth();
    const userId = auth.user.uid;
    const {data: achievementsData, isLoading: achievementsLoading, isError, achivementsError} = useGetAchievementsQuery(userId);

    return (
    <> 
      <div className="lg:flex">
            <template className="hidden lg:block">
                <Sidebar />
            </template>

        <div className="flex-1">
        <NavbarWeb />
        <div className="container mx-auto p-6">
            <h1 className="mb-2">Logros</h1>
            <p>Tus logros realizados se encuentran acá... ¡compartilos con todos en las redes sociales!</p>
        </div>
        <section className="backgroundTrama min-h-screen rounded-t-[30px] p-4 pb-8 mx-auto">
        {achievementsLoading &&
          <div className="flex justify-center">
            <Spinner color="default" />
          </div>
        }
        <div className="lg:flex lg:flex-wrap">
          {achievementsData?.map((achievement) => (
          <div key={achievement.id} className="mb-8 mt-4">
              <div className="backgroundWhite p-4 rounded-xl shadow-sm lg:flex gap-4">     
              <img src={achievement.image} alt={achievement.alt} className="max-h-48 rounded-lg" />    
                  <div className="flex flex-col justify-between">
                      <h2>{achievement.title}</h2>
                      <p><Chip className="shadow-md backgroundDarkGreen text-white" size="sm">{achievement.category}</Chip></p>
                      <p><span className="font-semibold">Puntos ganados:</span> {achievement.points}</p>
                      <p><span className="font-semibold">Carbono reducido:</span> {achievement.carbon} kg.</p>
                      <div className="flex justify-end">  
                      <Link to="">
                          <span className="iconShare mr-2 mt-4"></span>
                      </Link>
                      </div>
                  </div>
              </div>
          </div>  
          ))}  
        </div>
        {(achievementsData?.length === 0) &&
        <div>
          <p className="text-white text-center">Aún no hay logros.</p>
        </div>
        }

        </section>  
        </div>
      </div>
        <div className="block lg:hidden mt-8">
            <Menu></Menu>
        </div>
       
    </>
    );
}

