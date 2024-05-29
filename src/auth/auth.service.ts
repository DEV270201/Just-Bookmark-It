/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dtos/auth.dto";
import * as argon from 'argon2';

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService) {}

    async signup(body:AuthDTO) {

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
        return user;
    }

    login() {
        return {
            msg : "hello from the login...."
        }
    }
}