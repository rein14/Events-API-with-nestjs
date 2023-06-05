import { IsNotEmpty, IsDate, IsString, MaxLength } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";
import { StringExpression } from 'mongoose';


export class FilterEventsDto {
    @IsString()
    search: string;

    @IsString()
    category: string;
}