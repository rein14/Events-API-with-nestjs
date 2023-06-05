import { Controller, Post, Body, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { TicketDto } from './dto/ticket.dto';

@Controller('cart')
export class TicketsController {
    constructor( private readonly service: CartService){}
    
    @Get()
    async getCart() {
        return this.service.getAllCart()
    }

    @Post()
    async addItemToCart(@Body() ticketDto: TicketDto) {
        const userId = '6'
        const cart = await this.service.addTicket(userId, ticketDto);
        return cart
    }




}
//     async create ticketCart(tickk)
// }
