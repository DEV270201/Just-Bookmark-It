/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDTO, SignUpDTO } from "./dtos/auth.dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private jwt:JwtService, private config:ConfigService) {}

    async signup(body:SignUpDTO) {
        
        try{
            //generate password hash
            const hash = await argon.hash(body.password);
    
            //create the user
            const user = await this.prisma.users.create({
                data: {
                    email: body.email,
                    hash,
                    firstName: body.firstName,
                    lastName: body?.lastName
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true
                }
            });
            
            //return created user
            return {
                success: true,
                ...user
            };

        }catch(err){
              
           if(err instanceof PrismaClientKnownRequestError){
              if(err.code === 'P2002'){
                 throw new HttpException({
                    success: false,
                    message: `${err.meta.target[0]} already exists!`},HttpStatus.BAD_REQUEST);
              }
           }

           throw err;
        }
    }

    async login(body:SignInDTO) {
        try{

        //find the user based on the email
        const user = await this.prisma.users.findUnique({
            where: {
                email: body.email
            }
        })

       //throw error if user does not exists
       if(!user)
        throw new HttpException({
            success: false,
            message: `Incorrect email id`},HttpStatus.BAD_REQUEST);

       //compare password
       const passwordMatch = await argon.verify(user.hash, body.password);

       if(!passwordMatch)
        throw new HttpException({
            success: false,
            message: `Incorrect password`},HttpStatus.BAD_REQUEST);
       
       return this.signInToken(user.id);

        }catch(err){
            throw err;
        }
    }

    async signInToken(userId:number) : Promise<{success: boolean, access_token: string}> {
        const payload = {
            id: userId
        }

        const token = await this.jwt.signAsync(payload,{
            expiresIn: '30m',
            secret: this.config.get('JWT_SECRET')
        })

        return {
            success: true,
            access_token: token
        }
    }
}