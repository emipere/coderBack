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
  const { cid } = req.params;
  try {
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
    console.log(cid, pid);
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
    //  console.log("Producto:", product);
    //  console.log("Stock:", stock);
      // Verificar si hay suficiente stock
      if (stock >= item.quantity) {
        // Reducir el stock del producto
        await ProductsService.reduceStock(item.id_prod, item.quantity);
        purchasedProducts.push({
          product: product,
          quantity: item.quantity,
          price: product.price,
        }); 
      } else {
        notPurchasedProducts.push(item);
      }
     console.log("Stock:", stock);
  
      return purchasedProducts;
    }
   
    if (purchasedProducts.length > 0) {
      const amount = purchasedProducts.reduce((total, item) => {
        if (!item.product || typeof item.product.price !== "number") {
          console.error(
            `Producto inválido o sin precio: ${JSON.stringify(item.product)}`
          );
          console.log("Total acumulado hasta ahora:", total);
          return total;
        }
        return total + item.price * item.quantity;
      }, 0);
      console.log(purchaser);
      const ticket = await TicketsService.generateTicket(amount, purchaser);
    return ticket;
    }
      


      console.log("Ticket generado:", ticket);
      
    // Actualizar el carrito con los productos no comprados
    cart.products = notPurchasedProducts;
    await CartsService.updateCart(cid, cart);

    // Responder con los productos no comprados
    res.status(200).json({
      message: ticket ? "Compra procesada" : "No se realizaron compras",
      notPurchasedProducts: notPurchasedProducts.map((p) => p.id_prod),
    });
  } catch (error) {
    console.error("Error en purchaseCart:", error);
    res.status(500).json({ message: "Error al procesar la compra", error });
  }
};
