import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

//cache
const usersCache = {};
const refUsers = collection(db, 'users');

/**
* 
* @param {senderId: string, receiverId: string, message: string} data
* @returns {Promise} 
*/
export async function addToFavorites({userId, action}) {
    
    const userDoc = await getUser({userId});
    
    //Creo la referencia a la collection de messages.
    const favoritesRef = collection(db, `users/${userDoc.id}/favorites`);

    await addDoc(favoritesRef,{
        userId,
        action,
        created_at: serverTimestamp(),
    });

    return true;

}

/**
 * 
 * @param {senderId: string, receiverId:string} users 
 * @param {(){}[] => void} callback 
 * @returns {Promise<import("firebase/auth").Unsubscribe>}
 */
export async function subscribeToUser({userId}, callback){

    const userDoc = await getUserDoc({userId});
    
    //Creo la referencia a la collection de messages.
    const favoritesRef = collection(db, `favorites/${userDoc.id}/favorites`);

    const q = query(
        favoritesRef,
        orderBy('created_at')
    );

    return onSnapshot(q, snapshot => {
        const favorites = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                userId: doc.data().senderId,
                favorites: doc.data().action,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        callback(messages);
    })
}
//VOY POR ACA
export async function getUserDoc({userId}){
    
    const cacheRef = getOfCache({userId});

    if(cacheRef){
        console.log("el cache es: ", cacheRef);
        return cacheRef;
    }

    console.log("Busco el documento");
    const usersRef = collection(db, 'users');
    let usersDoc;

    const snapshot = await getDocs( 
        query(usersRef,
        where('users', '==', {
            [userId]: true,
        
        }),
        //cuando encuentra un documento con esos valores deje de buscar:
        limit(1),
     ));

    if(snapshot.empty){
        //Creo el documento para el chat privado
        usersDoc = await addDoc(usersRef, {
        user: {
             [userId]: true,
         }
     });
    }else{
        usersDoc = snapshot.docs[0];

    }
    addToCache({userId}, usersDoc);
     return usersDoc;
}

/**
 * 
 * Agrega al objeto global privateChatCache el valor que quiera guardar.
 * 
 * @param {{userId: string}} user
 * @param {{}} value 
 * @returns {{}}
 */
function addToCache({userId}, value){
    const key = getKeyForCache({userId});
    usersCache[key] = value;
}

/**
 * 
 * Obtiene los datos del cache y los devuelve. Si no hay nada retorna null.
 * 
 * @param {{userId: string}} user
 * @returns {{}||null}
 */
function getOfCache({userId}){
    const key = getKeyForCache({userId});
    return usersCache[key] || null;
}

/**
 * Devuelve la key unica generada para el caché.
 */
function getKeyForCache({userId}){
    return userId;
}

export async function getFavoritesUser({userId}) {

    const cacheRef = getOfCache({userId});

    if(cacheRef){
        console.log("el cache es: ", cacheRef);
        return cacheRef;
    }

    console.log("Busco el documento");
    const usersRef = collection(db, 'users');
    let usersDoc;

    const snapshot = await getDocs( 
        query(usersRef,
        where('user', '==', {
            [userId]: true
        }),
        //cuando encuentra un documento con esos valores deje de buscar:
        limit(1),
     ));
        
     usersDoc = snapshot.docs[0];

   
    addToCache({userId}, usersDoc);
     return usersDoc;
  }

export async function getAllFavoritesUser(){
    
    let usersDoc;
    console.log("Busco el documento");
    // const privateChatAdmin = collection(db, 'private-chats');
    // const querySnapshot = await getDocs(collection(db, 'private-chats'));
    await getDocs(refUsers);
    let favoritesDocs = querySnapshot.docs;
    console.log(favoritesDocs);

    return favoritesDocs;
}

export async function getUsersDocs(idUser){
    const usersRef = collection(db, 'users');
    let usersDoc;
    let usersDocId;
    
    
    const snapshot = await getDocs( 
        query(usersRef,
        where(`${idUser}`, '==', true),
        //cuando encuentra un documento con esos valores deje de buscar:
       limit(1),
     ));
            console.log(snapshot);

    console.log(snapshot);
     let documents = [];
     snapshot.forEach((doc) => {
         // Aquí puedes acceder a los datos de cada documento.
         // Por ejemplo, doc.data() te proporcionará los datos del documento.
         // Puedes ajustar esta parte según tu estructura de datos real.
             const documentData = {
                 id: doc.id, // ID del documento
                 ...doc.data(), // Datos del documento
             };
    
             documents.push(documentData);
         });
//         // const snapshot = await getDocs( 
//         //     query(privateChatAdmin,
//         //     where('users', '==', {
//         //         [adminId]: true,
//         //         [receiverId]: true,
//         //     }),
//         //     //cuando encuentra un documento con esos valores deje de buscar:
//         //     limit(1),
//         //  ));
     
        usersDocId = snapshot.docs[0];
        console.log(usersDocId);
        return usersDocId;
}