/* eslint-disable prettier/prettier */
import { NestFactory,HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  try{
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
      exceptionFactory: (errors)=> {
         console.log('Errors : ',errors);
         const result = errors.map((error)=>{
           return error.constraints[Object.keys(error.constraints)[0]]
         })
         return new HttpException({
          success: false,
          message: result
         },HttpStatus.BAD_REQUEST);
      },
      whitelist: true //removes properties from the request body that are not mentioned in the DTO
    })); //telling NestJS to use the validation pipe globally

    
    const {httpAdapter} = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.listen(3000);
    console.log("Listening on port 3000");
  }catch(err){
    console.log('Error : ',err);
    return;
  }
}
bootstrap();



// Some commands to keep in mind:
// 1. npx prisma migrate dev -> it will generate tables based on the given schema and push it to the Db
// 2. npx prisma generate -> it will generate all the types from the given schema
// 3. npx prisma studio -> it will start the UI for viewing and manipulating records