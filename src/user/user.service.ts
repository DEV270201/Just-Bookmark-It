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
}
