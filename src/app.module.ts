/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

// configModule is always attached to the root of the application 
@Module({
  imports: [AuthModule, PrismaModule, UserModule, BookmarkModule, ConfigModule.forRoot({ isGlobal: true }),HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
