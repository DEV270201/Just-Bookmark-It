/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
//creating connection to the database
export class PrismaService extends PrismaClient {
  constructor(){
    super({
        datasources:{
            db:{
                url: "postgresql://postgres:1234@localhost:5432/bookmark_db?schema=public"
            }
        }
    })
  }
}
