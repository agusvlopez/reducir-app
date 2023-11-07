import { createSlice } from "@reduxjs/toolkit";

export const favoriteActionSlice = createSlice({
    name: "favoriteAction",
    initialState: [],
    reducers: {
        addFavoriteAction: (state, action) => {
            return [...state, action.payload]
            //tambien guardar en bbdd
        }
    }
});  

export const selectFavoriteAction = (state) => state.favoriteAction;
export const {addFavoriteAction} = favoriteActionSlice.actions;
export default favoriteActionSlice.reducer;