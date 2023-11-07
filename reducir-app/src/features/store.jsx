import {configureStore} from "@reduxjs/toolkit";
import favoriteActionReducer from './favoritesSlice';

export const store = configureStore({
    reducer: {
        favoriteAction: favoriteActionReducer
    },

});