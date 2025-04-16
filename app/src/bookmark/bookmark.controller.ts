import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JWTGuard } from 'src/auth/guards';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dtos';

@Controller('bookmark')
@UseGuards(JWTGuard)
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService){}

    @Get('')
    getBookmarks(@GetUser() userId: number){
        return this.bookmarkService.getBookmarks(userId);
    }

    @Post('add')
    addNewBookmark(@GetUser() userId: number, @Body() data: CreateBookmarkDTO){
        return this.bookmarkService.addNewBookmark(userId,data);
    }

    @Patch(':id')
    updateBookmark(@GetUser() userId: number, @Param('id', ParseIntPipe) bookmarkId: number ,@Body() data: EditBookmarkDTO){
        return this.bookmarkService.updateBookmark(userId,bookmarkId,data);
    }

    @Delete(':id')
    deleteBookmark(@GetUser() userId: number, @Param('id', ParseIntPipe) bookmarkId: number){
        return this.bookmarkService.deleteBookmark(userId,bookmarkId);
    }
}
