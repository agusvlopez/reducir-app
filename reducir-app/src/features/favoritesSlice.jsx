// Importa Firebase Firestore y tu instancia de Firestore
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { createSlice } from "@reduxjs/toolkit";
import { useAuth } from "../context/authContext";

// export async function getPrivateChatDoc({senderId, receiverId}){
    

//   const favoritesRef = collection(db, 'favorites');
//   let favoriteDoc;

//   const snapshot = await getDocs( 
//       query(privateChatRef,
//       where('users', '==', {
//           [senderId]: true,
//           [receiverId]: true,
//       }),
//       //cuando encuentra un documento con esos valores deje de buscar:
//       limit(1),
//    ));

//   if(snapshot.empty){
//       //Creo el documento para el chat privado
//       privateChatDoc = await addDoc(privateChatRef, {
//       users: {
//            [senderId]: true,
//            [receiverId]: true,
//        }
//    });
//   }else{
//       privateChatDoc = snapshot.docs[0];

//   }

//   console.log("Busco el documento");
//   const privateChatRef = collection(db, 'private-chats');
//   let privateChatDoc;

//   const snapshot = await getDocs( 
//       query(privateChatRef,
//       where('users', '==', {
//           [senderId]: true,
//           [receiverId]: true,
//       }),
//       //cuando encuentra un documento con esos valores deje de buscar:
//       limit(1),
//    ));

//   if(snapshot.empty){
//       //Creo el documento para el chat privado
//       privateChatDoc = await addDoc(privateChatRef, {
//       users: {
//            [senderId]: true,
//            [receiverId]: true,
//        }
//    });
//   }else{
//       privateChatDoc = snapshot.docs[0];

//   }
//   addToCache({senderId, receiverId}, privateChatDoc);
//    return privateChatDoc;
// }

export const favoriteActionSlice = createSlice({
    name: "favoriteAction",
    initialState: [],
    reducers: {

        addFavoriteAction: async (state, action) => {
          // const usersRef = collection(db, `users/${action.payload.userId}`);
          const usersRef = doc(db, `users/${action.payload.userId}`);

          try {
            // Utiliza getDoc para obtener el documento
            const docSnapshot = await getDoc(usersRef);
        
            if (docSnapshot.exists()) {
              // Si el documento existe, accede al campo deseado
              const favoritesArray = docSnapshot.data()["favorites"];
              favoritesArray.forEach(objeto => {
                // Realizar operaciones en cada objeto del array
                console.log("Valor específico dentro de favorites:", objeto["actionId"]);
                if(objeto["actionId"] === action.payload.actionId){
                  console.log("Es igual!!!!!!!");
                  const docRef = updateDoc(usersRef,{ 
                    "favorites": arrayRemove({...action.payload}), 
                  });
                  return [...state, action.payload]
                }
              });
              console.log(favoritesArray);
              const docRef = updateDoc(usersRef,{ 
                "favorites": arrayUnion({...action.payload}), 
              });
              // const docRef = addDoc(collection(db, `favorites/${docRef.id}/actions`), action.payload)
                     
                console.log(await docRef)
    
                return [...state, action.payload]
              
            } else{
              // El documento no existe
              console.log("El documento no existe");
              
              return null;
            }
          } catch (error) {
            console.error("Error al obtener el documento:", error);
            throw error;
          }


            //tambien guardar en bbdd
        },

        deleteFavoriteAction: (state, action) => {
          const usersRef = collection(db, 'users');
          const docRef = doc(usersRef, action.payload);

        
            deleteDoc(docRef);
            // Actualizar el estado aquí si es necesario
            // ...


         return [...state, action.payload]
        
    }
  }
});  

export const selectFavoriteAction = (state) => state.favoriteAction;
export const {addFavoriteAction} = favoriteActionSlice.actions;
export const {deleteFavoriteAction} = favoriteActionSlice.actions;
export default favoriteActionSlice.reducer;

export const { addDocument } = favoriteActionSlice.actions;

