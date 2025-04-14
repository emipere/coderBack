import TicketModel from '../models/ticket.model.js';

export default class TicketsService {
    constructor() { };
    // no le llegan valores al total y al purchaser
    generateTicket = async (amount, purchaser) => {
        const ticket = await TicketModel.create ({
            amount,
            purchaser,
        });
        return ticket;
    }
};