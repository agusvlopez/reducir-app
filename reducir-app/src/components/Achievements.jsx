import React, { useEffect, useState } from "react";
import { Menu } from "./Menu";
import RecycleImg from "../covers/actions/recycle.jpg";  
import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavbarWeb from "./NavbarWeb";
import { useAuth } from "../context/authContext";
import { db } from "../firebase/firebase.config";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

export function Achievements () {
    const [achievements, setAchievements] = useState([]);
    const auth = useAuth();
    const userId = auth.user.uid;
  
    useEffect(() => {
        const userDocRef = doc(db, `users/${userId}`);
    
      if (userDocRef) {

        const unsubscribeUser = onSnapshot(userDocRef, async (docSnapshot) => {
          if (docSnapshot.exists()) {

            try 
            {          
              const achievementsCollectionRef = collection(userDocRef, 'achievements');

              const achievementSnapshot = await getDocs(achievementsCollectionRef);
              const achievementData = achievementSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

              if (!achievementSnapshot.empty) {
                setAchievements(achievementData);
                console.log(achievementData);
                return;
              }  
            }
            catch(err){
              console.log(err);
            }

          }  
            return () => {        
                // mounted.current = false;
                unsubscribeUser();
            };
        });


      }
    }, [userId]);

    return (
    <> 
        <div className="lg:flex">
            <template className="hidden lg:block">
                <Sidebar />
            </template>

        <div className="flex-1">
        <NavbarWeb></NavbarWeb>
        <div className="container mx-auto p-4">
            <h1 className="mb-2">Logros</h1>
            <p>Tus logros realizados se encuentran acá... ¡compartilos con todos en las redes sociales!</p>
        </div>
        <section className="backgroundDarkGreen min-h-screen rounded-t-[30px] p-4 pb-8 mx-auto">
        {achievements.map((achievement) => (
        <div key={achievement.id} className="mb-8 mt-4">
            <div className="backgroundWhite p-4 rounded-xl shadow-sm lg:flex gap-4">     
            <img src={achievement.image} alt={achievement.alt} className="max-h-72 rounded-lg" />    
                <div>
                    <h2>{achievement.title}</h2>
                    <small>Categoría: {achievement.category}</small>
                    <p>{achievement.description}</p>
                    <div className="flex justify-end">  
                    <Link to="">
                        <span className="iconShare mr-2 mt-4"></span>
                    </Link>
                    </div>
                </div>
            </div>
        </div>  
        ))}   
        </section>
        
        </div>
        </div>
        <div className="block lg:hidden mt-8">
            <Menu></Menu>
        </div>
       
    </>
    );
}

