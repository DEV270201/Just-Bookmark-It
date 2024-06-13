import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dtos';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService){}

    async getBookmarks(userId:number){
       try{

        const bookmarks = await this.prisma.bookmarks.findMany({
            where: {
                userId
            }
        });

        return {
            success: true,
            data: bookmarks
        }

       }catch(err){
         console.log('Error : ',err);
         throw err;
       }
    }

    async addNewBookmark(userId:number, data: CreateBookmarkDTO){
        try{
            
            const bookmark = await this.prisma.bookmarks.create({
                data: {
                    userId,
                    title: data.title,
                    description: data?.description,
                    link: data.link
                }
            });
    
            return {
                success: true,
                data: bookmark
            }
    
           }catch(err){
             console.log('Error : ',err);
             throw err;
           }

    }

    async updateBookmark(userId: number, bookmarkId:number, data: EditBookmarkDTO){
         try{

          const bookmark = await this.prisma.bookmarks.findUnique({
            where: {
                id: bookmarkId,
                userId
            }
          });

          if(!bookmark)
             throw new HttpException({
              success: false,
              message: 'No such bookmark present in your account...' 
            },HttpStatus.BAD_REQUEST);

          const updatedBookmark = await this.prisma.bookmarks.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...data
            }
          });

          return {
            success: true,
            ...updatedBookmark
          }

         }catch(err){
            console.log("Error : ",err);
            throw err;
         }
    }

    async deleteBookmark(userId: number, bookmarkId: number){
        try{

            const bookmark = await this.prisma.bookmarks.findUnique({
              where: {
                  id: bookmarkId,
                  userId
              }
            });
  
            if(!bookmark)
              throw new HttpException({
               success: false,
               message: 'No such bookmark present in your account...' 
             },HttpStatus.BAD_REQUEST);
  
            await this.prisma.bookmarks.delete({
              where: {
                  id: bookmarkId
              }
            });
  
            return {
              success: true,
            }
  
           }catch(err){
              console.log("Error : ",err);
              throw err;
           }
    }
}
