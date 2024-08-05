import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

@Controller('health')
export class HealthController {

    constructor(){}
    
    @Get("/")
    getAppHealth(){
        return {message: 'The application is in good health!'}
    }

}

