
import cartModel from "../models/cart.model.js";

export default class CartsService {
    constructor(){
       
    };  
    getCarts = async () => {
        const carts = await cartModel.find();
        return carts.map(carts=>carts.toObject());
    };
    createCart = async (cart) => {
        let result = await cartModel.create(cart);
        return result;
    };
    insertProductCart = async (cartId) => {
        const result = await cartModel.findById({_id: cartId});
        return result;
    };
    updateProductsCart = async (cartId , product) => {
       
        const result = await cartModel.updateOne({ _id: cartId }, { product });
        return result;
    };

    updateQuantityProductCart = async (cartId, productId) => {

        const result = await cartModel.findOne({ _id: cartId });
        const product = result.products.find(prod => prod.id_prod == productId);
        if (product) {
            product.quantity = quantity ;
        } else {
            return null 
        }
        return await result.save();
    };

    
    deleteProductCart = async ( cartId , productId) => {
       
    const result = await cartModel.findOne({ _id: cartId });
    const product = result.products.find(prod => prod.id_prod == productId);
       return await result.save();
    };


    deleteCart = async (cartId) => {
       
    const result = await cartModel.updateOne({ _id: cartId }, { products: [] });
    
    return result;
};
}





