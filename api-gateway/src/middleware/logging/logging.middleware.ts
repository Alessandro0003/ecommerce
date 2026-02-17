import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const startTime = Date.now();

    this.logger.log(
      `Incoming request: Method: ${method} - Url: ${originalUrl} - IP: ${ip} - User-Agent: ${userAgent}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('Content-Length');
      const duration = Date.now() - startTime;
      // Duration is response
      this.logger.log(
        `Request completed: Method: ${method} - Url: ${originalUrl} - StatusCode: ${statusCode} ${contentLength || 0} bytes - ${duration}ms`,
      );

      if (statusCode >= 400) {
        this.logger.error(
          `Error response: Method: ${method} - Url: ${originalUrl} - StatusCode: ${statusCode} - Duration: ${duration}ms`,
        );
      }
    });

    // Logs de errors
    res.on('error', (error) => {
      this.logger.error(
        `Response Error: Method: ${method} - Url: ${originalUrl} - ErroMessage: ${error.message}`,
      );
    });

    // Logs de timeout
    res.on('timeout', () => {
      this.logger.warn(
        `Response Timeout: Method: ${method} - Url: ${originalUrl} - Duration: ${Date.now() - startTime}ms`,
      );
    });

    next();
  }
}
