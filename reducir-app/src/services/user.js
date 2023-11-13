// En algún lugar de tu aplicación, preferiblemente en el punto de entrada
// (por ejemplo, en tu componente principal o en el archivo donde inicializas Firebase).


import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useDispatch } from "react-redux";

/**
 * 
 * @param {string} id 
 * @param {{email:string, rol: string}} data
 * @returns {Promise} 
 */
export async function createUserProfile(id, data) {
    //Pido la referencia
    const refUser = doc(db, `users/${id}`);
    //setDoc me permite escribir un documento especifico
    return setDoc(refUser,{...data});
}


// // Esta función carga los datos iniciales y los almacena en Redux
// export const loadInitialData = async () => {
//     const dispatch = useDispatch();
//   try {
//     const usersCollection = collection(db, 'users');
//     const usersSnapshot = await getDocs(usersCollection);

//     // Obtén los datos del campo "favorites" de cada usuario
//     const favoritesData = [];
//     usersSnapshot.forEach((userDoc) => {
//       const userData = userDoc.data();
//       const userFavorites = userData.favorites || [];
//       favoritesData.push(...userFavorites);
//     });

//     // Dispatch la acción personalizada para establecer el initialState
//     dispatch(setInitialFavorites(favoritesData));
//   } catch (error) {
//     console.error("Error al cargar datos iniciales:", error);
//   }
// };

// Llama a la función cuando tu aplicación se inicie

