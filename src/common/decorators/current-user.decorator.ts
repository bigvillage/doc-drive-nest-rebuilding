import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtUser } from '../../auth/interfaces/jwt-user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
