import React, { useState } from "react";
import { Menu } from "../components/Menu";
import { Chip, Spinner } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useGetAchievementsQuery, useGetUserQuery } from "../features/fetchFirebase";

export function Achievements() {
  const { accountId } = useParams();
  const { data: achievementsData, isLoading: achievementsLoading, isError, achivementsError } = useGetAchievementsQuery(accountId);
  const { data: accountData, isLoading: accountIsLoading, isError: accountIsError } = useGetUserQuery(accountId);
  console.log("achievementsData", achievementsData);
  console.log("accountData", accountData);
  return (
    <>
      <div className="lg:flex">
        <template className="hidden lg:block">
          <Sidebar />
        </template>

        <div className="flex-1">
          <div className="container mx-auto p-6">
            <h1 className="mb-2">Logros</h1>
            <p>Tus logros realizados se encuentran acá... ¡compartilos con todos en las redes sociales!</p>
          </div>
          <section className="backgroundTrama min-h-screen rounded-t-[30px] p-6 pb-8 mx-auto">
            {achievementsLoading &&
              <div className="flex justify-center">
                <Spinner color="default" />
              </div>
            }
            {!accountData?.account.achievements &&
              <div>
                <p className="text-white text-center text-2xl font-semibold">Aún no hay logros.</p>
              </div>
            }
            <div className="border-none backgroundWhite/90 dark:bg-default-100/50 max-w-[450px] mx-auto mb-4">
              {accountData?.account.achievements.map((achievement) => (
                <div key={achievement?._id} className="mb-2 mt-4">
                  <div className="backgroundWhite p-4 rounded-xl shadow-sm lg:flex gap-4">
                    <img src={achievement.image} alt={achievement.alt} className="w-100 lg:max-h-48 rounded-lg mb-2" />
                    <div className="flex flex-col justify-between">
                      <h2 className="text-lg font-semibold mb-2">{achievement.title}</h2>
                      <p><Chip className="shadow-md backgroundDarkGreen text-white mb-2" size="sm">{achievement.category}</Chip></p>
                      <p><span className="font-semibold">Puntos ganados:</span> {achievement.points}</p>
                      <p><span className="font-semibold">Carbono reducido:</span> {achievement.carbon} kg.</p>
                      <div className="flex justify-end">
                        <Link to={`/logros/${accountId}/nuevo/${achievement._id}`}>
                          <span className="iconShare mr-2 mt-4"></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="block lg:hidden mt-8">
        <Menu></Menu>
      </div>

    </>
  );
}

