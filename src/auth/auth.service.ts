import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  //   회원가입
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      return {
        result: true,
        message: '회원가입이 완료되었습니다.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException('이미 사용 중인 이메일입니다.');
      }

      throw error;
    }
  }

  //   로그인
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('가입되지 않은 이메일입니다.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      result: true,
      message: '로그인 성공',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
