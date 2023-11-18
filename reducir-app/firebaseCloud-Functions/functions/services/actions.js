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

//Get -> get()
//Fetch - single data from firestore using specific ID 
// app.get('/api/get/:id', (req, res) => {
//   (async () => {
//       try {
//           //fetch the ID
//           const reqDoc = db.collection('actions').doc(req.params.id);
//           let actionDetail = await reqDoc.get();
//           let response = actionDetail.data();

//            return res.status(200).send({status: 'Success', data: response})
//        }
//        catch(error){
//            console.log(error);
//            return res.status(500).send({status: 'Failed', msg: error})
//        }
//   })();
// });

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

module.exports = {
  createAction,
  getActionById,
  getAllActions,
  updateAction,
  deleteAction
};