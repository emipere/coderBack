import TicketModel from '../models/ticket.model.js';

export default class TicketsService {
    constructor() { };
    
    generateTicket = async (amount, purchaser) => {
        const ticket = await TicketModel.create ({
            amount,
            purchaser,
        });
        return ticket;
    }
};