
import factory from "./factory.js";


import CartsRepository from "./repository/carts.repository.js";
import ProductsRepository from "./repository/products.repository.js";

export const CartsService = new CartsRepository(factory.cartsDao);
export const ProductsService = new ProductsRepository(factory.productsDao);
