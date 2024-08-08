import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiFirebaseSlice = createApi({
    reducerPath: "FirebaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:2023/`
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (accountId) => `/account/${accountId}`,
            providesTags: ["Favorites", "Achievements", "Carbon"],
        }),
        getAction: builder.query({
            query: (actionId) => `/actions/${actionId}`
        }),
        getActions: builder.query({
            query: () => `/actions`
        }),
        getFavorites: builder.query({
            query: (userId) => `/account/${userId}/favorites`,
            headers: { 'auth-token': localStorage.getItem('token') },
            providesTags: ["Favorites"],
        }),
        createSession: builder.mutation({
            query: (data) => ({
                url: `/session`,
                method: "POST",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: data
            })
        }),
        createAccount: builder.mutation({
            query: (data) => ({
                url: `/account`,
                method: "POST",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: data
            })
        }),
        createFavorites: builder.mutation({
            query: ({ accountId, newFavorite }) => ({
                url: `/account/${accountId}/favorites`,
                method: "PUT",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: newFavorite
            }),
            invalidatesTags: ["Favorites"]
        }),
        deleteFavorite: builder.mutation({
            query: (action) => ({
                url: `/account/${action.accountId}/favorites/${action.actionId}`,
                method: "DELETE",
                headers: { 'auth-token': localStorage.getItem('token') }
            }),
            invalidatesTags: ["Favorites", "Achievements", "AchievementsPosts"]
        }),
        getCarbon: builder.query({
            query: (accountId) => `/account/${accountId}/carbon`,
            headers: { 'auth-token': localStorage.getItem('token') },
            providesTags: ["Carbon"],
        }),
        createCarbon: builder.mutation({
            query: (newCarbon) => ({
                url: `/account/${newCarbon.accountId}/carbon`,
                method: "PUT",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: newCarbon.carbon
            }),
            invalidatesTags: ["Carbon"]
        }),
        updateCarbon: builder.mutation({
            query: (newCarbon) => ({
                url: `/account/${newCarbon.accountId}/carbon`,
                method: "PUT",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: { carbon: newCarbon.carbon }
            }),
            invalidatesTags: ["Carbon"]
        }),
        getAchievements: builder.query({
            query: (accountId) => `/account/${accountId}/achievements`,
            headers: { 'auth-token': localStorage.getItem('token') },
            providesTags: ["Achievements"],
        }),
        getAchievement: builder.query({
            query: ({ accountId, achievementId }) => ({
                url: `/account/${accountId}/achievements/${achievementId}`,
                headers: { 'auth-token': localStorage.getItem('token') },
            }),
            providesTags: ["Achievements"],
        }),
        createAchievements: builder.mutation({
            query: (newAchievement) => ({
                url: `/account/${newAchievement.accountId}/achievements`,
                method: "PUT",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: newAchievement
            }),
            invalidatesTags: ["Achievements"]
        }),
        logoutSession: builder.mutation({
            query: () => ({
                url: `/session`,
                method: "DELETE",
                headers: { 'auth-token': localStorage.getItem('token') },
            }),
        }),
        createBlogpost: builder.mutation({
            query: (newBlogpost) => ({
                url: `/blogposts`,
                method: "POST",
                body: newBlogpost
            }),
            invalidatesTags: ["Blogposts"]
        }),
        getBlogposts: builder.query({
            query: (accountId) => `/blogposts/${accountId}`,
            headers: { 'auth-token': localStorage.getItem('token') },
            providesTags: ["Blogposts"],
        }),
        getBlogpost: builder.query({
            query: (blogpostId) => `/blogpost/${blogpostId}`,
            headers: { 'auth-token': localStorage.getItem('token') },
            providesTags: ["Blogposts"]
        }),
        getBlogpostsByAccount: builder.query({
            query: (accountId) => `/blogposts/${accountId}`,
            headers: { 'auth-token': localStorage.getItem('token') },
            providesTags: ["Blogposts"]
        }),
        getAllBlogposts: builder.query({
            query: () => `/blogposts`,
            providesTags: ["Blogposts"]
        }),
        createAchievementPost: builder.mutation({
            query: (newAchievement) => ({
                url: `/achievements`,
                method: "POST",
                body: newAchievement
            }),
            invalidatesTags: ["AchievementsPosts"]
        }),
        getAchievementsPosts: builder.query({
            query: () => `/achievements`,
            headers: { 'auth-token': localStorage.getItem('token') },
            providesTags: ["AchievementsPosts"]
        }),
        getAchievementPost: builder.query({
            query: (achievementId) => `/achievementspost/${achievementId}`,
            headers: { 'auth-token': localStorage.getItem('token') }
        }),
    })
});

export const {
    useGetUserQuery,
    useGetFavoritesQuery,
    useGetCarbonQuery,
    useCreateCarbonMutation,
    useUpdateCarbonMutation,
    useGetActionsQuery,
    useGetActionQuery,
    useCreateFavoritesMutation,
    useGetAchievementsQuery,
    useGetAchievementQuery,
    useCreateAchievementsMutation,
    useDeleteFavoriteMutation,
    useCreateSessionMutation,
    useCreateAccountMutation,
    useLogoutSessionMutation,
    useCreateBlogpostMutation,
    useGetBlogpostsQuery,
    useGetAllBlogpostsQuery,
    useGetBlogpostQuery,
    useGetBlogpostsByAccountQuery,
    useCreateAchievementPostMutation,
    useGetAchievementsPostsQuery,
    useGetAchievementPostQuery
} = apiFirebaseSlice;
