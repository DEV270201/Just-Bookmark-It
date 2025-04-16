import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoginInfo } from 'interfaces';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user: LoginInfo = request.user;
    return user.id;
  },
);