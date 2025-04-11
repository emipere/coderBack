import { CartsService } from "../services/services.js";

export const getCarts = async (req,res) => {
    try {
        const carts = await CartsService.getCarts();
        res.status(200).json(carts);
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}

export const getCartById = async (req,res) => {
    const { cid } = req.params;
    try {
        const cartById = await CartsService.getCartById(cid);
        res.status(200).json(cartById);
    } catch (error) {
        console.log(e);
        res.status(500).send(e)
    }
}

export const createCart = async (req,res)=> {
    try {
        const respuesta = await CartsService.createCart({ products: []})
        res.status(201).json(respuesta)
    }catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}

export const insertProductCart = async (req,res) => {
    try {
        const { cid, pid } = req.params;
        console.log(cid, pid);
        const result = await CartsService.insertProductCart(cid, pid);

        if (!result) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}

export const updateProductsCart = async (req,res)=> {
    try {
        const cartId = req.params
        const { newProducts } = req.body
        const cart = await CartsService.findOne({_id: cartId}) 
        cart.products = newProducts
        cart.save() 
        res.status(200).json(cart)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}

export const updateQuantityProductCart = async (req,res)=> {
    try {
        const cartId = req.params
        const productId = req.params
        const {quantity} = req.body
        const cart = await CartsService.findOne({_id: cartId})

        const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)

        if(indice != -1) {
            cart.products[indice].quantity = quantity
            cart.save() 
            res.status(200).send(cart)
        } else {
            res.status(404).send("Producto no existe")
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}

export const deleteProductCart = async (req,res)=> {
    try {
        const cartId = req.params
        const productId = req.params
        const cart = await CartsService.findOne({_id: cartId}) 
        const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)
        if (indice != -1) {
            cart.products.splice(indice, 1)
            cart.save() 
            res.status(200).send(cart)
        } else {
            res.status(404).send("Producto no existe");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

export const deleteCart = async (req,res)=> {
    try {
        const cartId = req.params
        const cart = await CartsService.findOne({_id: cartId})
        cart.products = []
        cart.save()
        res.status(200).send(cart)
    }catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}

export const ticketCartController = async (req,res) => {
    try {
        const user = req.user;
        const email = user.email;
        const amount = 5000; // Aquí puedes calcular el monto total de la compra según los productos en el carrito

        const purchaser = email;

        const ticketUser = await CartsService.generateTicketOrder(amount, purchaser);
        res.status(200).json( ticketUser );
    }   catch (error) {
        res.status(500).json({ message: "Error al generar el ticket", error })
    }
}