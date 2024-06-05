import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTGuard } from 'src/auth/guards';
import { GetUser } from './../auth/decorators';
import { profileUpdateDTO } from './dtos/user.dto';


@Controller('users')
@UseGuards(JWTGuard)
export class UserController {

    constructor(private userService :UserService){}
    
    @Get("profile")
    getUserProfile(@GetUser() userId: number){
        return this.userService.getUserProfile(userId);
    }

    @Patch("edit")
    updateProfile(@GetUser() userId: number, @Body() data: profileUpdateDTO){
       return this.userService.updateUserProfile(userId,data);
    }
}
