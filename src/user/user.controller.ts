import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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

    @Patch("profile/edit")
    @UseInterceptors(FileInterceptor('profile_pic', {
        fileFilter: (req,file,cb)=> {
            if (!file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(new HttpException({
                     success: false,
                     message: 'Invalid file format' 
                   },HttpStatus.BAD_REQUEST),false);
            cb(null,true);
            },
        storage: storageInfo
    }))
    updateProfile(@UploadedFile() file: Express.Multer.File|undefined, @GetUser() userId: number, @Body() data: profileUpdateDTO){
       return this.userService.updateUserProfile(userId,data,file);
    }
    
    @Delete('profile/delete')
    deleteProfile(@GetUser() userId: number){
        return this.userService.deleteProfile(userId);
    }
}

