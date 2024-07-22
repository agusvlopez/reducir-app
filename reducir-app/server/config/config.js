//importo la biblioteca dotenv.
import dotenv from "dotenv";

//Ejecuto el método config que lo que hace es leer el archivo .env y carga las variables allí definidas en el objeto process.env
dotenv.config();

export const config = {
    port: process.env.PORT,
    mongoDB_URI: process.env.MONGODB_URI
}

