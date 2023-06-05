import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Ticket } from './ticket.schema';

export type CartDocument = Cart & Document

@Schema()
export class Cart {
    @Prop()
    userId: string;

    @Prop()
    tickets: Ticket[]

    @Prop()
    totalPrice: number
}

export const CartSchema = SchemaFactory.createForClass(Cart);