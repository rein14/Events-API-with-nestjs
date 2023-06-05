import { Body, Controller, Delete, Get,Query, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { EventService } from './event.service';
import { FilterEventsDto } from './dto/filter.dto';


@Controller('events')
export class EventController {
    constructor(private readonly service: EventService) { }

    @Get()
    async getProducts(@Query() filterEventsDto: FilterEventsDto) {
        if (Object.keys(filterEventsDto).length) {
            const eventsFilter = await this.service.getFIlteredEvents(filterEventsDto);
            return eventsFilter
        } else {
            const allEvents = await this.service.findAll();
            return allEvents;
            // throw new NotFoundException(`Filter not found`)
        }
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        const event =  await this.service.findOne(id);
        if(!event) throw new NotFoundException('event doesnt exist');
        return event
    }

    @Post()
    async create(@Body() createEventDto: CreateEventDto) {
        return await this.service.create(createEventDto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        const event = await this.service.update(id, updateEventDto);
        if (!event) throw new NotFoundException('event doesnt exist');
        return event
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const event = await this.service.delete(id);
        if (!event) throw new NotFoundException('event doesnt exist');
        return event;
    }
}


