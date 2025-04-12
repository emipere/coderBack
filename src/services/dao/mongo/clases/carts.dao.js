import cartModel from "../models/cart.model.js";
import ticketModel from "../models/ticket.model.js";

export default class CartsService {
  constructor() {}
  getCarts = async () => {
    const carts = await cartModel.find().populate("products.id_prod").lean();
    return carts;
  };
  getCartById = async (cid) => {
    const cart = await cartModel.findOne({ _id: cid });
    return cart;
  };
  createCart = async (cart) => {
    let result = await cartModel.create(cart);
    return result;
  };

  
//   no se si esta bien esto
  updateCart = async (cid, updatedCart) => {
    let actualizaCart = await cartModel.findByIdAndUpdate(cid, updatedCart, { new: true });
    return actualizaCart;
};


  insertProductCart = async (cid, pid) => {
    try {
      // Busca el carrito por su ID
      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      // Busca el índice del producto en el carrito
      let product = cart.products.find((prod) => prod.id_prod == pid);
      if (product) {
       product.quantity += 1;
      } else {
       cart.products.push({ id_prod: pid, quantity: 1 });
      }
      // Guarda los cambios en la base de datos
      return await cart.save();
    } catch (error) {
      console.error("Error en insertProductCart:", error);
      throw error;
    }
  };
  updateProductsCart = async (cartId, product) => {
    const result = await cartModel.updateOne({ _id: cartId }, { product });
    return result;
  };
  updateQuantityProductCart = async (cartId, productId) => {
    const result = await cartModel.findOne({ _id: cartId });
    const product = result.products.find((prod) => prod.id_prod === productId);
    if (product) {
      product.quantity = quantity;
    } else {
      return null;
    }
    return await result.save();
  };

  deleteProductCart = async (cartId, productId) => {
    const result = await cartModel.findOne({ _id: cartId });
    const product = result.products.find((prod) => prod.id_prod === productId);
    return await result.save();
  };

  deleteCart = async (cartId) => {
    const result = await cartModel.updateOne({ _id: cartId }, { products: [] });

    return result;
  };

  generateTicketOrder = async (amount, purchaser) => {
    console.log("NO SE ROMPIÓ");
    const ticket = await ticketModel.create({
      purchase_datetime: new Date(),
      amount,
      purchaser,
    });
    console.log("SI SE ROMPIÓ");
    return ticket;
  }
}