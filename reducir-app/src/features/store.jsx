import {configureStore} from "@reduxjs/toolkit";
import favoriteActionReducer from './favoritesSlice';
import { apiFirebaseSlice } from "./fetchFirebase";
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
    reducer: {
        favoriteAction: favoriteActionReducer,
        [apiFirebaseSlice.reducerPath]: apiFirebaseSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiFirebaseSlice.middleware),
});

setupListeners(store.dispatch);