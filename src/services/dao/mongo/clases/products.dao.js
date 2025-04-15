import productModel from "../models/product.model.js";

export default class ProductsService {
    constructor() { };
    getProducts = async () => {
        const products = await productModel.find();
        return products.map(product => product.toObject());
    };

    getProductById = async (id) => {
        const result = await productModel.findOne({ _id: id });
        return result;
    };

    createProduct = async (product) => {
        const result = await productModel.create(product);
        return result;
    };

    updateProduct = async (id, product) => {
        const result = await productModel.updateOne({ _id: id },product);
        return result;
    };

    deleteProduct = async (id) => {
        const result = await productModel.deleteOne ({ _id: id });
        return result;
    };

    checkStock = async (pid) => {
        const result = await productModel.findOne({ _id: pid });
        if (!result) {
            return false;
        }
        return result.stock;
    };
    
    reduceStock = async (pid, quantity) => {
        const product = await productModel.findById(pid);
        if (!product) throw new Error("Producto no encontrado");
        if (product.stock < quantity) throw new Error("Stock insuficiente");
        product.stock -= quantity;
        await product.save();
    };
};