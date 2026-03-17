import { Injectable } from '@nestjs/common';
import { HealthStatus } from 'src/common/health/health-check.interface';
import { HealthCheckService } from 'src/common/health/health-check.service';

@Injectable()
export class HealthService {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  // Realiza o health check de todos os serviços e do próprio gateway
  async getHealthStatus() {
    const healthChecks = await this.healthCheckService.checkAllServices();
    const results = {
      status: HealthStatus.HEALTHY,
      timestamp: new Date().toISOString(),
      gateway: {
        status: HealthStatus.HEALTHY,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
      },
      services: {},
    };

    let hasUnhealthyServices = false;

    // Processa os resultados dos health checks dos serviços
    healthChecks.forEach((servicesHealth) => {
      results.services[servicesHealth.name] = {
        status: servicesHealth.status,
        responseTime: servicesHealth.responseTime,
        lastChecked: servicesHealth.lastChecked,
        url: servicesHealth.url,
        ...(servicesHealth.error && { error: servicesHealth.error }),
      };

      if (servicesHealth.status === HealthStatus.UNHEALTHY) {
        hasUnhealthyServices = true;
      }
    });

    if (hasUnhealthyServices) {
      results.status = HealthStatus.DEGRADED;
    }

    return results;
  }

  // Verifica para ver se o gateway está pronto para receber tráfego (ex: conexões com bancos, serviços essenciais)
  async getReadyStatus() {
    const healthStatus = await this.getHealthStatus();
    return {
      stauts:
        healthStatus.status === HealthStatus.HEALTHY ? 'ready' : 'not ready',
      timestamp: new Date().toISOString(),
    };
  }

  // Verifica se o gateway está vivo (ex: processo rodando, sem erros críticos)
  async getLiveStatus() {
    const healthStatus = await this.getHealthStatus();
    return {
      status:
        healthStatus.status === HealthStatus.HEALTHY ? 'alive' : 'not alive',
      timestamp: new Date().toISOString(),
    };
  }
}
