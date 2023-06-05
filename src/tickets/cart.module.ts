import { Module } from '@nestjs/common';
import { TicketsController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart,CartSchema } from './schemas/cart.schema';
import { Event, EventSchema } from 'src/event/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }, { name: Event.name, schema: EventSchema }])
  ],
  controllers: [TicketsController],
  providers: [CartService]
})
export class TicketModule {}