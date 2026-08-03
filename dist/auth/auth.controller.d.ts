import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        result: boolean;
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
        };
    }>;
    login(loginDto: LoginDto, response: Response): Promise<{
        result: boolean;
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
        };
    }>;
    logout(response: Response): {
        result: boolean;
        message: string;
    };
    getMe(req: any): {
        result: boolean;
        user: any;
    };
}
