import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase/firebase.config";
console.log(db);
export const apiFirebaseSlice = createApi({
    reducerPath: "FirebaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://127.0.0.1:5001/reducir-app/us-central1/app/`
    }),
    endpoints: (builder) => ({
        getAction: builder.query({
            query: (id) => `/api/get/${id}`
        }),
        getActions: builder.query({
            query: () => `/api/getAll`
        }),
        getFavorites: builder.query({
            query: (userId) => `api/users/get/${userId}/favorites`,
            providesTags: ["Favorites"],
        }),
        createFavorites: builder.mutation({
            query: (newFavorite) => ({
              url: `/api/users/create/${newFavorite.userId}/favorites`,
              method: "POST",
              body: newFavorite
            }),
            invalidatesTags: ["Favorites"]
        }),
        deleteFavorite: builder.mutation({
            query: (favorite) => ({
                url: `/api/users/delete/${favorite.userId}/favorites/${favorite.actionId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Favorites"]
        }),
        getCarbon: builder.query({
            query: (userId) => `/api/users/get/${userId}/carbon`,
            providesTags: ["Carbon"],
        }),
        createCarbon: builder.mutation({
            query: (newCarbon) => ({
                url: `/api/users/create/${newCarbon.userId}/carbon`,
                method: "POST",
                body: newCarbon
              }),
              invalidatesTags: ["Carbon"]
        }),
        getAchievements: builder.query({
            query: (userId) => `/api/users/get/${userId}/achievements`,
            providesTags: ["Achievements"],
        }),
        createAchievements: builder.mutation({
            query: (newAchievement) => ({
                url: `/api/users/create/${newAchievement.userId}/achievements`,
                method: "POST",
                body: newAchievement
            }),
            invalidatesTags: ["Achievements"]
        })
    })
});

export const {useGetFavoritesQuery, useGetCarbonQuery, useCreateCarbonMutation, useGetActionsQuery, useGetActionQuery, useCreateFavoritesMutation, useGetAchievementsQuery, useCreateAchievementsMutation, useDeleteFavoriteMutation} = apiFirebaseSlice;

