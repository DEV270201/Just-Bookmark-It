import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JWTGuard } from 'src/auth/guards';
import { LoginInfo } from 'interfaces';


@Controller('users')
@UseGuards(JWTGuard)
export class UserController {

    constructor(private userService :UserService){}
    
    @Get("profile")
    getUserProfile(@Req() req:Request){
        let user = req.user as LoginInfo;
        return this.userService.getUserProfile(user.id);
    }
}
