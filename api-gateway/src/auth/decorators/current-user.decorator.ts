import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface CurrentUserData {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}

export const CurrentUser = createParamDecorator(
  (_data: any, ctx: ExecutionContext) => {
    const request: CurrentUserData = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
