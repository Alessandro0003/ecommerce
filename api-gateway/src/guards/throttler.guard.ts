import { Injectable } from '@nestjs/common';
import {
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerRequest,
} from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Request): Promise<string> {
    return Promise.resolve(`${req.ip}- ${req.headers['user-agent']}`);
  }

  protected async handleRequest(
    requestProps: ThrottlerRequest,
  ): Promise<boolean> {
    const { context, limit, ttl } = requestProps;
    const { req, res } = this.getRequestResponse(context);
    const throttles = this.reflector.get('throttle', context.getHandler());
    const throttlerName = throttles ? Object.keys(throttles)[0] : 'default';
    const tracker = await this.getTracker(req as Request);
    const key = this.generateKey(context, tracker, throttlerName);
    const totalHits = await this.storageService.increment(
      key,
      ttl,
      limit,
      1,
      throttlerName,
    );

    if (Number(totalHits) > limit) {
      res.setHeader('Retry-After', Math.round(ttl / 1000));
      throw new ThrottlerException();
    }

    res.setHeader(`${this.headerPrefix}-Limit`, limit);
    res.setHeader(`${this.headerPrefix}-Remaining`, limit - Number(totalHits));
    res.setHeader(`${this.headerPrefix}-Reset`, Math.round(ttl / 1000));

    return true;
  }
}
