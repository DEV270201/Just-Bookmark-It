import { IsEmail, IsOptional } from "class-validator";


export class profileUpdateDTO {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    firstName: string;
    
    @IsOptional()
    lastName: string;
}