// // import admin from 'firebase-admin';


// // // var serviceAccount = require("./serviceAccountKey.json");
// // import * as serviceAccount from '../serviceAccountKey.json' assert { type: 'json' };

// const admin = require('firebase-admin');
// var serviceAccount = require("../serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// // var serviceAccount = require("./serviceAccountKey.json");
// //Main database reference
// const db = admin.firestore();

// async function createAction(action) {
//     (async () => {
       
//            // Accede a los datos de la solicitud utilizando req.body después de configurar el middleware express.json()
//             // const { title, description, image, category, carbon } = req.body;
//             return await db.collection("actions").doc(`/${Date.now()}/`).create({
//                 id: Date.now(),
//                 ...action
//                 // title: req.body.title,
//                 // description: req.body.description,
//                 // image: req.body.image,
//                 // category: req.body.category,
//                 // carbon: req.body.carbon
//             });


//     });
// }

// module.exports = { createAction };


// functions/services/actionsService.js

const admin = require('firebase-admin');

admin.initializeApp(/* your Firebase config */);
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

module.exports = {
  createAction
};