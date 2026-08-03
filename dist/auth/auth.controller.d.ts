import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
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
