/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dtos/index";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() body:AuthDTO) {
        return this.authService.signup(body);
    }

    @Post('login')
    login() {
        return this.authService.login();
    }

}