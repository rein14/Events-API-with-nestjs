import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";

export class TicketDto {
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @IsNumber()
    @IsNotEmpty()
    numberOfTickets: number;
}
