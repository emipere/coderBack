import ProductsDao from "./dao/mongo/clases/products.dao.js";
import CartsDao from "./dao/mongo/clases/carts.dao.js";



import ProductsRepository from "./repository/products.repository.js";
import CartsRepository from "./repository/carts.repository.js";



const productsDao = new ProductsDao();
const cartsDao = new CartsDao();


export const ProductsService = new ProductsRepository(productsDao);
export const CartsService = new CartsRepository(cartsDao);

