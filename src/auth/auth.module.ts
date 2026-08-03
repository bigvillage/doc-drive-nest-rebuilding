import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt'; // JWT 토큰 생성(sign) 및 검증 기능
import { JwtStrategy } from './strategies/jwt.strategy'; // Passport가 사용할 JWT 검증 로직
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // 인증이 필요한 요청을 검사하는 Guard

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my_secret_key',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
