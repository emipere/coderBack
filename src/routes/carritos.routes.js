import { Router } from "express";
import { getCart, createCart, insertProductCart } from "../controllers/carts.controllers.js";

const cartRouter = Router()

cartRouter.get('/:cid', getCart); 
cartRouter.post('/', createCart); 
cartRouter.post('/:cid/products/:pid', insertProductCart); 

export default cartRouter
