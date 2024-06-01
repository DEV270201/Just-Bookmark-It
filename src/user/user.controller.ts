/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {

    constructor(private userService :UserService){}
    
    @Get("profile")
    @UseGuards(AuthGuard('jwt'))
    getUserProfile(@Req() req:Request){
        console.log("user : ",req.user);
        return this.userService.getUserProfile();
    }
}
