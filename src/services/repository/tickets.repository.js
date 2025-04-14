export default class TicketsRepository {
    #dao
    constructor(dao) {
        this.#dao = dao;
    };
    generateTicket = async (amount, purchaser) => {
        return await this.#dao.generateTicket(amount, purchaser);
    }
}