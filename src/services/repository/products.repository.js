export default class ProductsRepository {

    #dao
    constructor(dao) {
       this.#dao = dao;
    };
    getProducts = async () => {
        return this.#dao.getProducts();
    };
    getProductById = async (id) => {
        return this.#dao.getProductById(id);
    };
    createProduct = async (product) => {
       return this.#dao.createProduct(product);
    };
    updateProduct = async (id,product) => {
        return this.#dao.updateProduct(id,product);
    };
    deleteProduct = async (id) => {
       return this.#dao.deleteProduct(id);
    }
}