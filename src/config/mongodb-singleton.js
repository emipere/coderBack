import mongoose from 'mongoose';
import config from './config.js';


export default class MongoSingleton {
    static #instance


    constructor() {
        this.#connectMongoDB()
    }

     static getInstance() {
        if (this.#instance) {
            console.log("Ya existe una conexion a MongoDB");
        } else {
            this.#instance = new MongoSingleton()
        }

        return this.#instance;
    }

    #connectMongoDB = async () => {
        try {
            if (!config.mongoUrl) {
                throw new Error("La URL de conexión a MongoDB no está definida. Verifica tu archivo .env.");
               }
            await mongoose.connect(config.mongoUrl);
            console.log("Me conecte con exito a MongoDB usando Moongose.");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    }
}