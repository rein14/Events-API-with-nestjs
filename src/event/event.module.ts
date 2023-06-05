import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  providers: [EventService],
  controllers: [EventController],
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])
  ],
})
export class EventModule {}
