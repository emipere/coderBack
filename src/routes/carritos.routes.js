import { Router } from "express";
import { getCart, createCart, insertProductCart,updateProductsCart,updateQuantityProductCart,deleteCart,deleteProductCart } from "../controllers/carts.controllers.js";
import { passportCall, authorization } from "../path.js";

const cartRouter = Router()


cartRouter.get('/:cid', passportCall("jwt"), authorization("admin"), getCart,); 
cartRouter.post('/', passportCall("jwt"), authorization("admin"), createCart); 
cartRouter.post('/:cid/products/:pid', passportCall("jwt"), authorization("user"), insertProductCart); 
cartRouter.put('/:cid', passportCall("jwt"), authorization("admin"), updateProductsCart) 
cartRouter.put('/:cid/products/:pid', passportCall("jwt"), authorization("admin"), updateQuantityProductCart)  
cartRouter.delete('/:cid', passportCall("jwt"), authorization("admin"), deleteCart)  
cartRouter.delete('/:cid/products/:pid', passportCall("jwt"), authorization("admin"), deleteProductCart) 

export default cartRouter
