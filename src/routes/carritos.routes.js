import { Router } from "express";
import { getCarts, getCartById, createCart, insertProductCart,updateProductsCart,updateQuantityProductCart,deleteCart,deleteProductCart,purchaseCart } from "../controllers/carts.controllers.js";
import { passportCall, authorization } from "../path.js";

const cartRouter = Router()


cartRouter.get('/', getCarts);

cartRouter.get('/:cid', getCartById);

cartRouter.post('/', createCart);

cartRouter.post('/:cid/products/:pid', insertProductCart);

cartRouter.put('/:cid', passportCall("jwt"), authorization("admin"), updateProductsCart) 

cartRouter.put('/:cid/products/:pid', updateQuantityProductCart)  

cartRouter.delete('/:cid', deleteCart)

cartRouter.delete('/:cid/products/:pid', passportCall("jwt"), authorization("admin"), deleteProductCart) 


cartRouter.get('/:cid/purchase', passportCall("jwt"), authorization("user"),purchaseCart)

export default cartRouter;