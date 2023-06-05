import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Event } from 'src/event/schemas/event.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket{
    @Prop({type: SchemaTypes.ObjectId, ref: Event.name})
    eventId: string;

    @Prop()
    numberOfTickets: number;

    // @Prop()
    // price: number;
    
    @Prop()
    subTotalPrice: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);