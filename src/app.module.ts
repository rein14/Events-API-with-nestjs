import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { TicketModule } from './tickets/cart.module';

@Module({
  imports: [MongooseModule.forRoot('mongoUrl', {
    useNewUrlParser: true, useUnifiedTopology: true
  }), EventModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
