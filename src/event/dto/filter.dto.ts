import { IsNotEmpty, IsDate, IsString, MaxLength } from 'class-validator';
export class FilterEventsDto {
    @IsString()
    search: string;

    @IsString()
    category: string;
}