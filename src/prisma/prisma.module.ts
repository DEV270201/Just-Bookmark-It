/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //this service will be globally available to all other modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
