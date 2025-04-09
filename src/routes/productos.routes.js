import { Router } from "express";
import { getProducts, getProductById,createProduct,updateProduct,deleteProduct } from "../controllers/products.controller.js";
import { passportCall, authorization } from "../path.js";

const productRouter = Router();


productRouter.get("/", getProducts);

productRouter.get("/:pid", getProductById)

productRouter.post("/", passportCall("jwt"), authorization("admin"), createProduct);

productRouter.put("/:pid", passportCall("jwt"), authorization("admin"), updateProduct);

productRouter.delete("/:pid", passportCall("jwt"), authorization("admin"), deleteProduct);

export default productRouter;

