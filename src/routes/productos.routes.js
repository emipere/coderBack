import { Router } from "express";

import { getProducts, getProductById,createProduct,updateProduct,deleteProduct } from "../controllers/products.controller.js";

const productRouter = Router();


productRouter.get("/", getProducts);

productRouter.get("/:pid", getProductById)

productRouter.post("/", createProduct);

productRouter.put("/:pid", updateProduct);

productRouter.delete("/:pid", deleteProduct);

export default productRouter;
