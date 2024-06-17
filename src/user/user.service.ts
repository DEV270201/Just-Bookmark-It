import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { profileUpdateDTO } from './dtos/user.dto';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private readonly s3Service: S3Client;
  constructor(private prisma: PrismaService,private config:ConfigService) {
    this.s3Service = new S3Client({
      region: this.config.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.config.getOrThrow('AWS_SECRET_KEY')
      }
    })
  }

  async getUserProfile(id: number) {
    try {
      const user: Users = await this.prisma.users.findFirst({
        where: {
          id,
        },
      });

      if (!user) 
        throw new HttpException({
          success: false,
          message: 'No such user exists' 
        },HttpStatus.BAD_REQUEST);

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

  async updateUserProfile(id: number, data: profileUpdateDTO) {
    try {
      
      //if there is not data then simply return the function
      if(!data)
         return
      
      const user: Users = await this.prisma.users.update({
        where: {
          id,
        },
        data,
      });

      if (!user) 
          throw new HttpException({
              success: false,
              message: 'No such user exists' 
            },HttpStatus.BAD_REQUEST);

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

  async updateUserProfilePicture(id:number, file: Express.Multer.File){
      try{
        //1. upload the picture to s3 

        let split = file.originalname.split('.');
        let Key = String(id) + '.' + split[split.length-1];
        let Bucket = this.config.getOrThrow('AWS_S3_BUCKET');
        let Region = this.config.getOrThrow('AWS_S3_REGION');
        
        
        const data = await this.s3Service.send(
          new PutObjectCommand({
            Body: file.buffer,
            Bucket,
            Key
          })
        )

        console.log("data received from s3 : ",data);

        //2. update the db
        let link = `https://${Bucket}.s3.${Region}.amazonaws.com/${Key}`
        await this.prisma.users.update({
          where: {
            id
          },
          data: {
              photo: link
            }
        });
        
        return {
          success: true,
          link
        }

      }catch(err){
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

        const deleteProfile = this.s3Service.send(
          new DeleteObjectCommand({
            Bucket: this.config.getOrThrow('AWS_S3_BUCKET'),
            Key: String(userId) + '.png'
          })
        )

        const deleteUser = this.prisma.users.delete({
          where: {
            id: userId
          }
        });
        
        // error pls fix it 
        await this.prisma.$transaction([deleteBookmarks,deleteProfile,deleteUser]);

        return {
          success: true
        };

       }catch(err){
         console.log("Err : ",err);
         throw err;
       }
  }
}
