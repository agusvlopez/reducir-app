// Importa Firebase Firestore y tu instancia de Firestore
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { createSlice } from "@reduxjs/toolkit";

export const favoriteActionSlice = createSlice({
    name: "favoriteAction",
    initialState: [],
    reducers: {
        // Tu acción para agregar un documento a Firestore
        addDocument: async (state, action) => {
        try {
          // Agregar un documento a la colección "miColeccion" en Firestore
          const docRef = await addDoc(collection(db, "actionsFavorites"), action.payload);
  
          // Actualizar el estado de Redux con los datos del documento (opcional)
          state.data.push({
            id: docRef.id,
            ...action.payload,
          });
        } catch (error) {
          console.error("Error al agregar documento a Firestore:", error);
        }
      },

        addFavoriteAction: (state, action) => {
            return [...state, action.payload]
            //tambien guardar en bbdd
        }
    }
});  

export const selectFavoriteAction = (state) => state.favoriteAction;
export const {addFavoriteAction} = favoriteActionSlice.actions;
export default favoriteActionSlice.reducer;

export const { addDocument } = favoriteActionSlice.actions;

