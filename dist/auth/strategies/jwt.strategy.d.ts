import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    validate(payload: any): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
    }>;
}
export {};
