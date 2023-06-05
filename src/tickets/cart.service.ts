import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { TicketDto } from './dto/ticket.dto';
import { UpdateEventDto } from 'src/event/dto/event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from 'src/event/schemas/event.schema';
// import { EventService } from 'src/event/event.service';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private readonly model: Model<CartDocument>, @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>) { }


    async createUserCart(userId: string, ticketDto: TicketDto, subTotalPrice: number, totalPrice: number): Promise<Cart> {
        const newCart = await this.model.create({
            userId,
            tickets: [{ ...ticketDto, subTotalPrice }],
            totalPrice
        });
        return newCart;
    }

    async getAllCart(): Promise<Cart[]> {
        return this.model.find().exec()
    }
    async getCart(userId: string): Promise<CartDocument> {
        const cart = this.model.findOne({ userId });
        return cart;
    }

    async deleteCart(userId: string): Promise<Cart> {
        const deletedCart = this.model.findOneAndRemove({ userId });
        return deletedCart
    }

    async getEvent(id: string): Promise<EventDocument> {
        const event = this.eventModel.findById(id).exec();
        return event
    }

    async updateEvent(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        return await this.eventModel.findByIdAndUpdate(id, updateEventDto).exec();
    }

    async getCartTotal(cart: CartDocument, ticketPrice: number) {
        cart.totalPrice = 0;
        cart.tickets.forEach(ticket => {
            cart.totalPrice += (ticket.numberOfTickets * ticketPrice);
        })
        cart.save()
    }

    async addTicket(userId: string, ticketDto: TicketDto): Promise<Cart> {
        const { eventId, numberOfTickets } = ticketDto;

        const cart = await this.getCart(userId);
        const event = await this.getEvent(eventId);
        const ticketPrice = event.ticketPrice;
        const subTotalPrice = numberOfTickets * ticketPrice;

        if (cart) {
            const ticketIndex = cart.tickets.findIndex((ticket) => ticket.eventId == eventId);
            if (ticketIndex > -1) {
                const ticket = cart.tickets[ticketIndex];

                ticket.numberOfTickets = Number(ticket.numberOfTickets) + Number(numberOfTickets);
                ticket.subTotalPrice = ticket.numberOfTickets * ticketPrice;
                // get the number of tickets left for the event 
                const remainingticket = event.numberOfTickets - numberOfTickets;
                // check if numberOftickets is not more than set limit
                if (ticket.numberOfTickets <= event.limit) {
                    await this.updateEvent(eventId, { "numberOfTickets": remainingticket, updatedAt: new Date() });

                    cart.tickets[ticketIndex] = ticket;
                    // calculate whatever is the cart
                    await this.getCartTotal(cart, ticketPrice)

                } else {
                    throw new NotAcceptableException(`Cant buy more tickets than the set limit ${event.limit}`);
                }
            } else {
                cart.tickets.push({
                    ...ticketDto, subTotalPrice
                });
                // calculate whatever is in the cart
                await this.getCartTotal(cart, ticketPrice)
            }
        } else {
            const newCart = await this.createUserCart(userId, ticketDto, subTotalPrice, ticketPrice)
            return newCart;
        }
    }

}
