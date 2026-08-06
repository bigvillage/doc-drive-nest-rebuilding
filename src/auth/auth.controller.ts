import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
// swagger
import { ApiTags, ApiOperation, ApiBody, ApiCookieAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: SignupDto })
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);

    response.cookie('token', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 1000,
    });

    return {
      result: true,
      message: '로그인 성공',
      user: result.user,
    };
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiCookieAuth('token')
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return {
      result: true,
      message: '서비스 로그아웃 성공',
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    return {
      result: true,
      user: req.user,
    };
  }
}
