import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Passport에게 이름이 jwt인 인증 전략을 실행해줘라는 의미
export class JwtAuthGuard extends AuthGuard('jwt') {}
