import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document, Schema as MongooseSchema } from 'mongoose';


export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    category: string;
    
    @Prop({ required: true })
    numberOfTickets: number;

    @Prop({required: true})
    ticketLimit: boolean;

    @Prop({required: true})
    limit: number;
    
    @Prop()
    ticketPrice: number;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
