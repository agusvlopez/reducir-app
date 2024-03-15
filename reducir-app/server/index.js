import express from 'express';
import cors from 'cors';
import ActionsRoute from './routes/actions.js';

const app = express();
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(cors()); //cualquiera puede acceder a la API(lo ideal es limitarlo, dice como en la documentacion de cors)
app.use(express.json()); //interpreta el body cuando viene un JSON.

app.use(ActionsRoute);

const port = process.env.PORT || 2023;

app.listen(port, function () {
    console.log(`El servidor está levantado! http://localhost:${port}`);
});