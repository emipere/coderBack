
import MongoSingleton from '../config/mongodb-singleton.js'
import config from '../config/config.js';


let cartsDao
let productsDao


async function initializeMongoService() {
    try {
        await MongoSingleton.getInstance()
        console.log(`Server listening on http://localhost:${config.port}`);
    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); 
    }

}

async function initializeServices() {

  switch (config.persistence) {
    case "mongodb":
        initializeMongoService()

        const { default: CartsService } = await import("./dao/mongo/clases/carts.dao.js")
        const { default: ProductsService } = await import("./dao/mongo/clases/products.dao.js")
        cartsDao = new CartsService() // se crea isntacia de la clase
        productsDao = new ProductsService() // se crea isntacia de la clase
              
        break;

    default:
        throw new Error(`Persistencia "${config.persistence}" no soportada.`);
}}
await initializeServices()
export default { cartsDao, productsDao };