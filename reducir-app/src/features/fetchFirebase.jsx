import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase/firebase.config";
console.log(db);
export const apiFirebaseSlice = createApi({
    reducerPath: "FirebaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:2023/`
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (userId) => `/api/user/${userId}`
        }),
        getAction: builder.query({
            query: (id) => `actions/${id}`
        }),
        getActions: builder.query({
            query: () => `actions`
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

export const { useGetUserQuery, useGetFavoritesQuery, useGetCarbonQuery, useCreateCarbonMutation, useGetActionsQuery, useGetActionQuery, useCreateFavoritesMutation, useGetAchievementsQuery, useCreateAchievementsMutation, useDeleteFavoriteMutation } = apiFirebaseSlice;

