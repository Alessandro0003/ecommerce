import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CircuitBreakerService } from 'src/common/circuit-breaker/circuit-breaker.service';
import { CacheFallbackService } from 'src/common/fallback/cache.fallback.service';
import { DefaultFallbackService } from 'src/common/fallback/default.fallback.service';
import { serviceConfig } from 'src/config/gateway.config';

interface UserInfo {
  userId?: string;
  email?: string;
  role?: string;
}

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly circuitBreakerService: CircuitBreakerService,
    private readonly cacheFallback: CacheFallbackService,
    private readonly defaultFallback: DefaultFallbackService,
  ) {}

  async proxyRequest(
    serviceName: keyof typeof serviceConfig,
    method: string,
    path: string,
    data?: unknown,
    headers?: Record<string, string>,
    userInfo?: UserInfo,
  ) {
    const service = serviceConfig[serviceName];
    const url = `${service.url}${path}`;

    this.logger.log(
      `Proxying method ${method} request to ${serviceName}: ${url}`,
    );

    const fallback = this.createServiceFallback(serviceName, method, path);

    return this.circuitBreakerService.executeWithCircuitBreaker(
      async () => {
        const enhancedHeaders = {
          ...headers,
          'x-user-id': userInfo?.userId,
          'x-user-email': userInfo?.email,
          'x-user-role': userInfo?.role,
        };

        const response = await firstValueFrom(
          this.httpService.request({
            method: method.toLowerCase(),
            url,
            data,
            headers: enhancedHeaders,
            timeout: service.timeout,
          }),
        );

        if (method.toLowerCase() === 'get') {
          this.cacheFallback.setCachedData(
            `${serviceName}:${path}`,
            response.data,
          );
        }

        return response.data;
      },
      `proxy-${serviceName}`,
      fallback,
      {
        failureThreshold: 3,
        timeout: 30000,
        resetTimeout: 30000,
      },
    );
  }

  async getServiceHealth(serviceName: keyof typeof serviceConfig) {
    try {
      const service = serviceConfig[serviceName];
      const response = await firstValueFrom(
        this.httpService.get(`${service.url}/health`, {
          timeout: 3000,
        }),
      );

      return {
        status: response.status,
        data: response.data as unknown,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        status: 'unhealthy',
        error: errorMessage,
      };
    }
  }

  private createServiceFallback(
    serviceName: string,
    method: string,
    path: string,
  ) {
    switch (serviceName) {
      case 'user':
        if (path.includes('/auth/login')) {
          return this.defaultFallback.createErrorFallback(
            'users',
            'Authentication service unavailable',
          );
        }
        return this.defaultFallback.createErrorFallback(
          'users',
          'User service unavailable',
        );
      case 'products':
        if (method.toLowerCase() === 'get') {
          return this.cacheFallback.createCacheFallback<unknown>(
            `products:${path}`,
            {
              data: {
                products: [],
                total: 0,
                page: 1,
                limit: 10,
              },
            },
          );
        }
        return this.defaultFallback.createErrorFallback(
          'products',
          'Product service unavailable',
        );
      case 'checkout':
      case 'payments':
        return this.defaultFallback.createErrorFallback(
          serviceName,
          `${serviceName} service unavailable`,
        );
      default:
        return this.defaultFallback.createErrorFallback(
          serviceName,
          'Service unavailable',
        );
    }
  }
}
