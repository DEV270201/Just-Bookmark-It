import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';


@Catch(Prisma.PrismaClientInitializationError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientInitializationError, host: ArgumentsHost) {
    console.log("Error : ",exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    if(exception.errorCode === 'P1000'){
        return response.status(status).json({
            success: false,
            message: 'Invalid credentials for database connection'
        })
      }else if(exception.errorCode === 'P1001' || exception.errorCode === 'P1002' || exception.errorCode === 'P1003'){
        return response.status(status).json({
          success: false,
          message: 'Cannot connec to the database..'
      })
      }
    
       // default error message
       super.catch(exception, host);
  }
}
