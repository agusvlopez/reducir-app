const { doc, getDoc, getDocs } = require('firebase/firestore');
const admin = require('firebase-admin');
admin.initializeApp();

//   {
//   credential: admin.credential.applicationDefault()
// }

const db = admin.firestore();

async function createAction(action) {
  try {
    const result = await db.collection("actions").doc(`/${Date.now()}/`).create({
      id: Date.now(),
      ...action
    });
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

async function getActionById(id) {
  try {
    const reqDoc = db.collection('actions').doc(id);
    const actionDetail = await reqDoc.get();
    return actionDetail.data();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getAllActions = async () => {
  try {
      const query = db.collection('actions');
      let response = [];

      const data = await query.get();
      let docs = data.docs;

      docs.map((doc) => {
          const selectedItem = {
              title: doc.data().title,
              description: doc.data().description,
              tip: doc.data().tip,
              image: doc.data().image,
              alt: doc.data().alt,
              category: doc.data().category,
              carbon: doc.data().carbon,
              points: doc.data().points,
              id: doc.data().id
          };

          response.push(selectedItem);
      });

      return response;
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
};

const updateAction = async (itemId, newData) => {
  try {
      const reqDoc = db.collection('actions').doc(itemId);
      await reqDoc.update(newData);

      return { status: 'Success', msg: 'Data saved' };
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
};

const deleteAction = async (itemId) => {
  try {
      const reqDoc = db.collection('actions').doc(itemId);
      await reqDoc.delete();

      return { status: 'Success', msg: 'Data removed from Firestore' };
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
};

const getUserById = async (userId) => {
  try {
    const reqDoc = db.collection('users').doc(userId);
    const userDetail = await reqDoc.get();
    return userDetail.data();
  } catch (error) {
    console.error(error);
    throw error;
  }
//  const userDoc = doc(db, "users", userId);
//    if (userDoc) {
//     //  const favorites = userDetail.data()?.favorites || [];
//      return userDoc;
//    }
 
//    throw new Error('Usuario no encontrado');
};

const getFavoritesByUserId = async (userId) => {
  const userRef = db.collection('users').doc(userId);
  const userDetail = await userRef.get();
  
   if (userDetail) {
     const favorites = userDetail.data()?.favorites || [];
     return favorites;
   }
 
   throw new Error('Usuario no encontrado');
};

const addToFavorites = async (userId, newFavorite) => {
  const userRef = db.collection('users').doc(userId);
  
  try {
    const userDetail = await userRef.get();

    const favorites = userDetail.data()?.favorites || [];

    favorites.push(newFavorite);

    await userRef.update({
      favorites: favorites
    });

    return getFavoritesByUserId(userId);
  } catch (error) {
    throw new Error('Error al agregar a favoritos: ' + error.message);
  }
};

const getCarbonByUserId = async (userId) => {
  const userRef = db.collection('users').doc(userId);
  const userDetail = await userRef.get();
  
   if (userDetail) {
     let carbon = userDetail.data()?.carbon || 0;
     return carbon;
   }
 
   throw new Error('Usuario no encontrado');
};

const updateCarbon = async (userId, newCarbon) => {
  const userRef = db.collection('users').doc(userId);
  const userDetail = await userRef.get();

  if (userDetail.exists) {
    const currentCarbon = userDetail.data()?.carbon || 0;
    const doc = await userRef.set({ carbon: newCarbon }, { merge: true });
   
    return doc
  }

  throw new Error('Usuario no encontrado');
};

const getAchievementsByUserId = async (userId) => {
  try {
    const query = db.collection(`users/${userId}/achievements`);
    let response = [];

    const data = await query.get();
    let docs = data.docs;

    docs.map((doc) => {
         const selectedItem = {
             title: doc.data().title,
             description: doc.data().description,
             tip: doc.data().tip,
             image: doc.data().image,
             alt: doc.data().alt,
             category: doc.data().category,
             carbon: doc.data().carbon,
             points: doc.data().points,
             id: doc.data().id,
      };

      response.push(selectedItem);
    });

    return response;
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
};


const addToAchievements = async (userId, newData) => {
  const achievementsCollectionRef = db.collection(`users/${userId}/achievements`);
  try {
    const newAchievementRef = await achievementsCollectionRef.add(newData);
    const newAchievementSnapshot = await newAchievementRef.get();
    const newAchievement = newAchievementSnapshot.data();

    return newAchievement;
  } catch (error) {
    throw new Error('Error al agregar a logros: ' + error.message);
  }
};

const deleteFavorite = async (userId, favoriteId) => {
  const userRef = db.collection('users').doc(userId);

  try {
    const userDetail = await userRef.get();
    const favorites = userDetail.data()?.favorites || [];
    const favoriteIndex = favorites.findIndex(favorite => favorite.actionId == favoriteId);

    if (favoriteIndex !== -1) {
      favorites.splice(favoriteIndex, 1);
    } else {
      throw new Error('Favorito no encontrado.');
    }

    await userRef.update({
      favorites: favorites
    });
    
    return getFavoritesByUserId(userId);
  } catch (error) {
    throw new Error('Error al eliminar favorito: ' + error.message);
  }
};

module.exports = {
  createAction,
  getActionById,
  getAllActions,
  updateAction,
  deleteAction,
  getFavoritesByUserId,
  getCarbonByUserId,
  addToFavorites,
  getAchievementsByUserId,
  addToAchievements,
  deleteFavorite,
  updateCarbon,
  getUserById
};