import express from 'express';
import cors from 'cors';
import ActionsRoute from './routes/actions.js';
import AccountsRoute from './routes/account.js';
import mongoose from 'mongoose';
import { connectDB } from './config/dbConnection.js';
import { config } from './config/config.js';


const corsOptions = {
    origin: true,
    credentials: true
};

const app = express();
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(cors(corsOptions)); //cualquiera puede acceder a la API(lo ideal es limitarlo, dice como en la documentacion de cors)
app.use(express.json()); //interpreta el body cuando viene un JSON.


// Conectar a la base de datos
connectDB();

app.use(ActionsRoute);
app.use(AccountsRoute);

const port = config.port || 2023;


// app.listen(port, function () {
//     console.log(`El servidor está levantado! http://localhost:${port}`);
// });

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`El servidor está levantado! http://localhost:${port}`);
    })
});