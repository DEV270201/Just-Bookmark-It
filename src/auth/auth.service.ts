/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService{
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