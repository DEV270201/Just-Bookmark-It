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

    @Patch("edit_info")
    updateUserProfile(@GetUser() userId: number, @Body() data: profileUpdateDTO){
       return this.userService.updateUserProfile(userId,data);
    }

    @Patch("edit_pic")
    @UseInterceptors(FileInterceptor('profile_pic', {
        fileFilter: (req,file,cb)=> {
            if (!file.originalname.match(/^.*\.(png)$/))
                cb(new HttpException({
                     success: false,
                     message: 'File should be in PNG format' 
                   },HttpStatus.BAD_REQUEST),false);
            cb(null,true);
            },
        // storage: storageInfo
    }))
    updateUserProfilePicture(@UploadedFile() file: Express.Multer.File, @GetUser() userId: number){

       if(!file)
          throw new HttpException({success: false, message: 'File not provided....'},HttpStatus.BAD_REQUEST);

       return this.userService.updateUserProfilePicture(userId,file);
    }

    
    @Delete('profile/delete')
    deleteProfile(@GetUser() userId: number){
        return this.userService.deleteProfile(userId);
    }
}

