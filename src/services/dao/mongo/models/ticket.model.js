import mongoose from "mongoose";

const productsCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: () => `TICKET-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now 
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
  }
});

const TicketModel = mongoose.model(productsCollection, ticketSchema);

export default TicketModel;

