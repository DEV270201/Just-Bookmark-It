/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService)
    
    login() {
        return {
            msg : "hello from the login...."
        }
    }

    signup() {
        return {
            msg : "hello from the signup...."
        }
    }
}