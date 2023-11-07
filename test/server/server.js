import express from 'express';
import mongoose from 'mongoose';
import { MongoClient} from "mongodb";

const app = express();
// mongoose.connect('mongodb://127.0.0.1:27017/reducir_app')
 const client = new MongoClient('mongodb://127.0.0.1:27017');
 const db = client.db("reducir_app");
 const UsersCollection = db.collection('users');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: Number
});

const UserModel = mongoose.model(UsersCollection, UserSchema);

app.get("/getUsers", (req,res) => {
    UserModel.find({})
    .then(function(users){
        res.json(users)
    }).catch(function(err){
        console.log(err);
    });
});

//Escuchamos un puerto
app.listen(3001, function () {
    console.log("El servidor esta levantado! http://localhost:3001");
});