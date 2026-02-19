import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true; // No role required, allow access
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = context.switchToHttp().getRequest().user;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!user || !user.role) {
      throw new ForbiddenException('User role not found'); // No user or roles found, deny access
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const hasRole = requiredRole.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Acess denied. Required role: ${requiredRole.join(',')}`,
      ); // User does not have required role, deny access
    }

    return true;
  }
}
