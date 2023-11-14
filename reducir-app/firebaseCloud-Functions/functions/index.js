const functions = require("firebase-functions");

const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const express = require("express");
const cors = require("cors");


//Main App
const app = express();
// app.use(express.json());
app.use(cors({origin: true}));

//Main database reference
const db = admin.firestore();

//Routes
app.get('/', (req,res) => {
    return res.status(200).send('Hi there, how you doing?')
});

//Create -> post()
app.post("/api/create", (req,res) => {
    (async () => {
        try {
           // Accede a los datos de la solicitud utilizando req.body después de configurar el middleware express.json()
            // const { title, description, image, category, carbon } = req.body;
            await db.collection("actions").doc(`/${Date.now()}/`).create({
                id: Date.now(),
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                category: req.body.category,
                carbon: req.body.carbon
            });

            return res.status(200).send({status: 'Success', msg: 'Data saved'})
        }
        catch(error){
            console.log(error);
            return res.status(500).send({status: 'Failed', msg: error})
        }
    })();
});

//Get -> get()
//Fetch - single data from firestore using specific ID 
app.get('/api/get/:id', (req, res) => {
    (async () => {
        try {
            //fetch the ID
            const reqDoc = db.collection('actions').doc(req.params.id);
            let actionDetail = await reqDoc.get();
            let response = actionDetail.data();

             return res.status(200).send({status: 'Success', data: response})
         }
         catch(error){
             console.log(error);
             return res.status(500).send({status: 'Failed', msg: error})
         }
    })();
});


//Fetch all the details from firestore
app.get('/api/getAll', (req, res) => {
    (async () => {
        try {
            const query = db.collection('actions');
            let response = [];

            await query.get().then((data) => {
                let docs = data.docs;

                docs.map((doc) => {
                    const selectedItem = {
                        title: doc.data().title,
                        description: doc.data().description,
                        image: doc.data().image,
                        category: doc.data().category,
                        carbon: doc.data().carbon
                    }

                    response.push(selectedItem);
                });
                return response; 
            });

             return res.status(200).send({status: 'Success', data: response})
         }
         catch(error){
             console.log(error);
             return res.status(500).send({status: 'Failed', msg: error})
         }
    })();
});

//Update -> put()
app.put("/api/update/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection('actions').doc(req.params.id);
            await reqDoc.update({
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                category: req.body.category,
                carbon: req.body.carbon
            });

            return res.status(200).send({status: 'Success', msg: 'Data saved'})
        }
        catch(error){
            console.log(error);
            return res.status(500).send({status: 'Failed', msg: error})
        }
    })();
});

//Delete -> delete()
//Update -> put()
app.delete("/api/delete/:id", (req, res) => {
    (async () => {
        try {
            const reqDoc = db.collection('actions').doc(req.params.id);
            await reqDoc.delete();
            return res.status(200).send({status: 'Success', msg: 'Data removed from firestore'})
        }
        catch(error){
            console.log(error);
            return res.status(500).send({status: 'Failed', msg: error})
        }
    })();
});
//exports the api to firebase cloud functions
exports.app = functions.https.onRequest(app); 