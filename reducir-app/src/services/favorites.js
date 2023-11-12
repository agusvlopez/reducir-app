import { addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../src/firebase/firebase.config";

export async function getFavoritesDoc({userId}){
    
    // const cacheRef = getOfCache({senderId,receiverId});

    // if(cacheRef){
    //     console.log("el cache es: ", cacheRef);
    //     return cacheRef;
    // }

    console.log("Busco el documento");
    const favoritesRef = collection(db, 'favorites');
    let favoritesDoc;

    const snapshot = await getDocs( 
        query(favoritesRef,
        where('user', '==', {
            [userId]: true,
        }),
        //cuando encuentra un documento con esos valores deje de buscar:
        // limit(1),
     ));

    if(snapshot.empty){
        //Creo el documento para el chat privado
        favoritesDoc = await addDoc(favoritesRef, {
        user: {
             [userId]: true,
         }
     });
    }else{
        favoritesDoc = snapshot.docs[0];

    }
    // addToCache({senderId, receiverId}, privateChatDoc);
     return favoritesDoc;
}