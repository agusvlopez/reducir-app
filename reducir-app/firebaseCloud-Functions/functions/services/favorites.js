
// const { doc, getDoc,  } = require('firebase/firestore');
// const { db } = require('../index.js');


// const getFavoritesByUserId = async (userId) => {
//  const userRef = db.collection('users').doc(userId);
// //   const userRef = doc(db, `users/${userId}`);
//   const docSnapshot = await getDoc(userRef);

//   if (docSnapshot.exists()) {
//     const favorites = docSnapshot.data()?.favorites || [];
//     return favorites;
//   }

//   throw new Error('Usuario no encontrado');
// };

// module.exports = {
//   getFavoritesByUserId,
// };