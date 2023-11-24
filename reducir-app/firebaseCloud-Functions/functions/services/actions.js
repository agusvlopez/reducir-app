const { doc, getDoc } = require('firebase/firestore');
const admin = require('firebase-admin');
admin.initializeApp();
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

const getFavoritesByUserId = async (userId) => {
  const userRef = db.collection('users').doc(userId);
 //const docSnapshot = doc(db, `users/${userId}`);
  //  const docSnapshot = await getDoc(userRef);
  const userDetail = await userRef.get();
  
   if (userDetail) {
     const favorites = userDetail.data()?.favorites || [];
     return favorites;
   }
 
   throw new Error('Usuario no encontrado');
 };

module.exports = {
  createAction,
  getActionById,
  getAllActions,
  updateAction,
  deleteAction,
  getFavoritesByUserId
};