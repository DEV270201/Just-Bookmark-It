/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDTO, SignUpDTO } from "./dtos/index";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() body:SignUpDTO) {
        return this.authService.signup(body);
    }   
    
    @HttpCode(200)
    @Post('login')
    login(@Body() body:SignInDTO) {
        return this.authService.login(body);
    }

}