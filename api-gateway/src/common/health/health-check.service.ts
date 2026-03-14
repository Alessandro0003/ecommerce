import { Injectable, Logger } from '@nestjs/common';
import { HealthStatus, ServiceHealth } from './health-check.interface';
import { HttpService } from '@nestjs/axios';
import { CircuitBreakerService } from '../circuit-breaker/circuit-breaker.service';
import { serviceConfig } from '../../config/gateway.config';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class HealthCheckService {
  private readonly logger = new Logger(HealthCheckService.name);
  private readonly healthCache = new Map<string, ServiceHealth>();

  constructor(
    private readonly httpService: HttpService,
    private readonly circuitBreakerService: CircuitBreakerService,
  ) {}

  async checkServiceHealth(
    serviceName: keyof typeof serviceConfig,
  ): Promise<ServiceHealth> {
    const service = serviceConfig[serviceName];
    const startTime = Date.now();

    try {
      await this.circuitBreakerService.executeWithCircuitBreaker(
        async () => {
          const response = await firstValueFrom(
            this.httpService
              .get(`${service.url}/health`, { timeout: service.timeout })
              .pipe(timeout(service.timeout)),
          );
          return response.status;
        },
        `health-${serviceName}`,
        () => {
          throw new Error(`Health check failed for ${serviceName}`);
        },
      );

      const responseTime = Date.now() - startTime;
      const serviceHealth: ServiceHealth = {
        name: serviceName,
        url: service.url,
        status: HealthStatus.HEALTHY,
        responseTime,
        lastChecked: new Date(),
      };

      this.healthCache.set(serviceName, serviceHealth);
      return serviceHealth;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const serviceHealth: ServiceHealth = {
        name: serviceName,
        url: service.url,
        status: HealthStatus.UNHEALTHY,
        responseTime,
        lastChecked: new Date(),
        error: error.message,
      };

      this.healthCache.set(serviceName, serviceHealth);
      this.logger.error(
        `Health check failed for ${serviceName}:`,
        error.message,
      );

      return serviceHealth;
    }
  }
}
