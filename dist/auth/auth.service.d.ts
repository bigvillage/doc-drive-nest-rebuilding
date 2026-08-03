import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    signup(signupDto: SignupDto): Promise<{
        result: boolean;
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        result: boolean;
        message: string;
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
        };
    }>;
}
