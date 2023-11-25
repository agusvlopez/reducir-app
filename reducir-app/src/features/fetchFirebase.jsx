import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase/firebase.config";
console.log(db);
export const apiFirebaseSlice = createApi({
    reducerPath: "FirebaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://127.0.0.1:5001/reducir-app/us-central1/app/`
    }),
    endpoints: (builder) => ({
        getFavorites: builder.query({
            query: (userId) => `api/users/get/${userId}/favorites`
        }),
        getCarbon: builder.query({
            // Define la lógica de tu nuevo endpoint aquí
            query: (userId) => `/api/users/get/${userId}/carbon`, // Puedes ajustar la URL según tus necesidades
        }),
    })
});

export const {useGetFavoritesQuery, useGetCarbonQuery} = apiFirebaseSlice;

