import { BadRequestException, Body, Controller, Get, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTGuard } from 'src/auth/guards';
import { GetUser } from './../auth/decorators';
import { profileUpdateDTO } from './dtos/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import storageInfo from 'src/utils/multerStorage';


@Controller('users')
@UseGuards(JWTGuard)
export class UserController {

    constructor(private userService :UserService){}
    
    @Get("profile")
    getUserProfile(@GetUser() userId: number){
        return this.userService.getUserProfile(userId);
    }

    @Patch("edit")
    @UseInterceptors(FileInterceptor('profile_pic', {
        fileFilter: (req,file,cb)=> {
            if (!file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(new BadRequestException('Invalid file format...'),false);
            cb(null,true);
            },
        storage: storageInfo
    }))
    updateProfile(@UploadedFile() file: Express.Multer.File|undefined, @GetUser() userId: number, @Body() data: profileUpdateDTO){
       return this.userService.updateUserProfile(userId,data,file);
    }
}
