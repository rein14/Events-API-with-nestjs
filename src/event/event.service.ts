import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { Event, EventDocument } from './schemas/event.schema';

import { FilterEventsDto } from './dto/filter.dto';
@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private readonly model: Model<EventDocument>) { }

    async findAll(): Promise<Event[]> {
        const events = await this.model.find().exec();
        return events
    }

    async findEvent(id: string): Promise<Event> {
        return await this.model.findById(id).exec();
    }

    async createEvent(createEventDto: CreateEventDto): Promise<Event> {
        const createdEvent = await new this.model({ ...createEventDto, createdAt: new Date() });
        return createdEvent.save();
    }

    async updateEvent(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        return await this.model.findByIdAndUpdate(id, updateEventDto).exec();
    }

    async deleteEvent(id: string): Promise<Event> {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async getFIlteredEvents(filterEventDto: FilterEventsDto): Promise<Event[]> {
        const {category, search} = filterEventDto;
        let events = await this.findAll();

        if (search) {
            events = events.filter(event => 
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                 event.description.toLowerCase().includes(search.toLowerCase())
                 );
        }
        if (category) {
            events = events.filter(event => event.category.toLowerCase() === category.toLowerCase())
        }

        return events;

}

} 