export default class TicketsRepository {
    #dao
    constructor(dao) {
        this.#dao = dao;
    };
    // Obtener todos los tickets
    // Generar un ticket
    generateTicket = async (amount, purchaser) => {
        return await this.#dao.generateTicket(amount, purchaser);
    }
}