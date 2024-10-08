/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";


export class SignUpDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    // @Matches('(?=.*.\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')
    password: string;

    @IsNotEmpty()
    firstName: string;
    
    @IsOptional()
    lastName: string;
}

export class SignInDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
