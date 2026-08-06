import type { Request } from 'express';
import { JwtUser } from './jwt-user.interface';

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}
