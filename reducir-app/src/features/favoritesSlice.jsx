// Importa Firebase Firestore y tu instancia de Firestore
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuth } from "../context/authContext";

// Crear el thunk asincrónico
export const addFavorite = createAsyncThunk("favoriteAction/addFavorite", async (payload) => {
  const usersRef = doc(db, `users/${payload.userId}`);
  const docSnapshot = await getDoc(usersRef);

  if (docSnapshot.exists()) {
    const favoritesArray = docSnapshot.data()["favorites"];
    const isActionInFavorites = favoritesArray.some((objeto) => objeto.actionId === payload.actionId);

    const updatedFavorites = isActionInFavorites
      ? favoritesArray.filter((objeto) => objeto.actionId !== payload.actionId)
      : [...favoritesArray, payload];

    await updateDoc(usersRef, {
      "favorites": updatedFavorites,
    });

    return updatedFavorites;
  }
});

export const favoriteActionSlice = createSlice({
    name: "favoriteAction",
    initialState: {
      favorites: [],
      isLoading: true
    },
    reducers: {

      // addFavoriteAction: async (state, action) => {
      //   const usersRef = doc(db, `users/${action.payload.userId}`);

      //   // Utiliza getDoc para obtener el documento
      //   const docSnapshot = await getDoc(usersRef);
  
      //   if (docSnapshot.exists()) {
      //     // Si el documento existe, accede al campo deseado
      //     const favoritesArray = docSnapshot.data()["favorites"];
  
      //     // Verifica si la acción ya está en la lista de favoritos
      //     const isActionInFavorites = favoritesArray.some(
      //       (objeto) => objeto.actionId === action.payload.actionId
      //     );
  
      //     // Actualiza la lista de favoritos
      //     const updatedFavorites = isActionInFavorites
      //       ? favoritesArray.filter(
      //           (objeto) => objeto.actionId !== action.payload.actionId
      //         )
      //       : [...favoritesArray, action.payload];
  
      //     const docRef = await updateDoc(usersRef, {
      //       "favorites": updatedFavorites,
      //     });
  
      //     state.favorites = updatedFavorites;
      //     console.log(updatedFavorites);
      //     return updatedFavorites;
      //   }
      // },

      setFavorites: (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false; 
      },

      setLoading: (state, action) => {
        state.isLoading = action.payload;
      },

      extraReducers: (builder) => {
        builder        
        .addCase(addFavorite.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addFavorite.fulfilled, (state, action) => {
          state.favorites = action.payload;
          state.isLoading = false;
        })
        .addCase(addFavorite.rejected, (state) => {
          state.isLoading = false;
        });
      },
      
  }
});  

export const selectFavoriteAction = (state) => state.favoriteAction.favorites;
export const selectLoading = (state) => state.favoriteAction.isLoading;
export const {addFavoriteAction} = favoriteActionSlice.actions;
export const {setFavorites, setLoading} = favoriteActionSlice.actions;
export default favoriteActionSlice.reducer;

export const { addDocument } = favoriteActionSlice.actions;

