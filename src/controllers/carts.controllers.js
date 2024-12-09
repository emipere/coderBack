import cartModel from "../models/cart.model.js";
export const getCart = async (req,res)=> {
    try {
        const cartId = req.params.cid 
        const cart = await cartModel.findById(cartId) 
        res.status(200).send(cart)
    }catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}
export const createCart = async (req,res)=> {
    try {
        const respuesta = await cartModel.create({products: []})
        res.status(201).send(respuesta)
    }catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}
export const insertProductCart = async (req,res)=> {
    try {
        const cartId = req.params.cid 
        const productId = req.params.pid 
        const {quantity} = req.body
        const cart = await cartModel.findById(cartId)
        if(cart) {
         
            const indice = cart.products.findIndex(prod => prod.id_prod == productId)
            if(indice != -1) { 
                cart.products[indice].quantity = quantity 
            } else {
                cart.products.push({id_prod : productId, quantity: quantity}) 
            }
            const mensaje = await cartModel.findByIdAndUpdate(cartId, cart) 
            return res.status(200).send(mensaje)
        } else {
            res.status(404).send("Carrito no existe")
        }
        
    }catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}