import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}
  
    async getUserProfile(id:number){
        try{
            const user: Users = await this.prisma.users.findFirst({
                where: {
                    id
                }
            });

            console.log("user : ",user);
    
            if(!user)
                throw new BadRequestException('No such user exists...');
    
            let {hash,...rest} = user;
            return rest;

        }catch(err){
            console.error("Error : ",err);
            throw err;
        }
    }
}
