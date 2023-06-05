import { IsNotEmpty, IsDate, IsString, MaxLength, IsNumber, IsBoolean } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types"; 
import { StringExpression } from 'mongoose';


export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @MaxLength(100)
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    numberOfTickets: number;

    @IsBoolean()
    ticketLimit: boolean;

    @IsNumber()
    limit: number;

    @IsNumber()
    ticketPrice: number;

}

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @IsDate()
    updatedAt: Date;
}

