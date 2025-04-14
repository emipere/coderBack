import { CartsService } from "../services/services.js";
import { ProductsService } from "../services/services.js"; // Asegúrate de tener un servicio para productos
import { TicketsService } from "../services/services.js"; // Servicio para generar tickets

export const getCarts = async (req, res) => {
  try {
    const carts = await CartsService.getCarts();
    res.status(200).json(carts);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cartById = await CartsService.getCartById(cid);
    res.status(200).json(cartById);
  } catch (error) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const createCart = async (req, res) => {
  try {
    const respuesta = await CartsService.createCart({ products: [] });
    res.status(201).json(respuesta);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const insertProductCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await CartsService.insertProductCart(cid, pid);

    if (!result) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const updateProductsCart = async (req, res) => {
  try {
    const cartId = req.params;
    const { newProducts } = req.body;
    const cart = await CartsService.findOne({ _id: cartId });
    cart.products = newProducts;
    cart.save();
    res.status(200).json(cart);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const updateQuantityProductCart = async (req, res) => {
  try {
    const cartId = req.params;
    const productId = req.params;
    const { quantity } = req.body;
    const cart = await CartsService.findOne({ _id: cartId });

    const indice = cart.products.findIndex(
      (prod) => prod.id_prod._id == productId
    );

    if (indice != -1) {
      cart.products[indice].quantity = quantity;
      cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send("Producto no existe");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const deleteProductCart = async (req, res) => {
  try {
    const cartId = req.params;
    const productId = req.params;
    const cart = await CartsService.findOne({ _id: cartId });
    const indice = cart.products.findIndex(
      (prod) => prod.id_prod._id == productId
    );
    if (indice != -1) {
      cart.products.splice(indice, 1);
      cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send("Producto no existe");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const cartId = req.params;
    const cart = await CartsService.findOne({ _id: cartId });
    cart.products = [];
    cart.save();
    res.status(200).send(cart);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const user = req.user; // Obtener el usuario autenticado
    const email = user.email; // Obtener el email del usuario autenticado
    const purchaser = email;

    // Obtener el carrito por ID
    const cart = await CartsService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const purchasedProducts = [];
    const notPurchasedProducts = [];

    for (const item of cart.products) {
      const product = await ProductsService.getProductById(item.id_prod);
      const stock = await ProductsService.checkStock(item.id_prod);

      if (stock > 0) {
        const quantityToBuy = Math.min(stock, item.quantity);
        await ProductsService.reduceStock(item.id_prod, quantityToBuy);

        purchasedProducts.push({
          quantity: quantityToBuy,
          price: product.price,
          product: product,
        });
        if (quantityToBuy < item.quantity) {
          notPurchasedProducts.push({
            id_prod: item.id_prod,
            quantity: item.quantity - quantityToBuy,
          });
        }
      } else {
        notPurchasedProducts.push({
          id_prod: item.id_prod,
          quantity: item.quantity,
        });
      }
    }
    // Actualizar el carrito con los productos no comprados
    cart.products = notPurchasedProducts;
    if (notPurchasedProducts.length > 0) {
     await CartsService.updateCart(cid, { products: notPurchasedProducts });
    } else {
     await CartsService.deleteCart(cid);
    }

    const total = purchasedProducts.reduce((total, item) => {
      if (!item.product || typeof item.price !== "number") {
        console.error(`Producto inválido o sin precio: ${JSON.stringify(item.product)}`);
        return total;
      }
      return total + item.product.price * item.quantity;
    }, 0);

    const amount = total;
    const ticket = await TicketsService.generateTicket(amount, purchaser);

    res.status(200).json({ message: "Compra procesada", ticket: ticket, notPurchasedProducts: notPurchasedProducts.map((p) => ({ id_prod: p.id_prod, quantity: p.quantity })) });
  } catch (error) {
    console.error("Error en purchaseCart:", error);
    res.status(500).json({ message: "Error al procesar la compra", error });
  }
};