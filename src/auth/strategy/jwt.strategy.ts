/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private config: ConfigService, private prisma: PrismaService ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload:any){
        // console.log("payload : ",typeof(payload.id));
        const user = await this.prisma.users.findFirst({
            where: {
                id: payload.id
            }
        });

        if(!user)
            throw new HttpException({
                success: false,
                message: `No such user exists!`},HttpStatus.UNAUTHORIZED);
        return {id: payload.id};
    }
}