import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { profileUpdateDTO } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserProfile(id: number) {
    try {
      const user: Users = await this.prisma.users.findFirst({
        where: {
          id,
        },
      });

      if (!user) throw new BadRequestException('No such user exists...');

      let { hash, ...rest } = user;
      return {
        success: true,
        ...rest
      };
    } catch (err) {
      console.error('Error : ', err);
      throw err;
    }
  }

  async updateUserProfile(id: number, data: profileUpdateDTO, file?: Express.Multer.File) {
    try {
      console.log("file : ",file?.originalname);
      const user: Users = await this.prisma.users.update({
        where: {
          id,
        },
        data,
      });

      if (!user) throw new BadRequestException('No such user exists...');

      let { hash, ...rest } = user;
      return {
        success: true,
        ...rest
      };
    } catch (err) {
      console.error('Error : ', err);
      throw err;
    }
  }

  async deleteProfile(userId:number) {
       try{
        //1. delete all the bookmarks saved by the user
        //2. delete the profile picture from the s3 bucket
        //3. delete the user itself

        const deleteBookmarks = this.prisma.bookmarks.deleteMany({
          where: {
            userId
          }
        });

        const deleteUser = this.prisma.users.delete({
          where: {
            id: userId
          }
        });

        await this.prisma.$transaction([deleteBookmarks,deleteUser]);

        return {
          success: true
        };

       }catch(err){
         console.log("Err : ",err);
         throw err;
       }
  }
}
