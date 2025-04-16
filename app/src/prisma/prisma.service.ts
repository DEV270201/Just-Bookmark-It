/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PrismaClient} from '@prisma/client';

@Injectable()
//creating connection to the database
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService){
    super({
        datasources:{
            db:{
                url: config.get('DATABASE_URL'),
            }
        }
    })
  }
}
