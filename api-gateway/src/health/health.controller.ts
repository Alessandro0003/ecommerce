import { Controller, Get, Param } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheckService } from 'src/common/health/health-check.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthStatus } from 'src/common/health/health-check.interface';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly healthCheckService: HealthCheckService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check do gateway' })
  @ApiResponse({ status: 200, description: 'Gateway está saudável.' })
  getHealthStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0',
    };
  }

  @Get('services')
  @ApiOperation({ summary: 'Health check de todos os serviços' })
  @ApiResponse({ status: 200, description: 'Status de todos os serviços' })
  async getServicesHealth() {
    const services = await this.healthCheckService.checkAllServices();

    const allHealthy = services.every((s) => s.status === HealthStatus.HEALTHY);
    const someHealthy = services.some((s) => s.status === HealthStatus.HEALTHY);

    const overallStatus = allHealthy
      ? 'healthy'
      : someHealthy
        ? 'degraded'
        : 'unhealthy';

    return {
      overallStatus,
      timestamp: new Date().toISOString(),
      services,
      sumary: {
        total: services.length,
        healty: services.filter((s) => s.status === HealthStatus.HEALTHY)
          .length,
        unhealthy: services.filter((s) => s.status === HealthStatus.UNHEALTHY)
          .length,
        degraded: services.filter((s) => s.status === HealthStatus.DEGRADED)
          .length,
      },
    };
  }

  @Get('services/:serviceName')
  @ApiOperation({ summary: 'Health check de um serviço específico' })
  @ApiResponse({ status: 200, description: 'Status do serviço' })
  getServiceHealth(@Param('serviceName') serviceName: string) {
    const cached = this.healthCheckService.getCachedHealth(serviceName);
    if (!cached) {
      return {
        status: 'unknown',
        message: 'Service not found or never checked',
        timestamp: new Date().toISOString(),
      };
    }

    return cached;
  }

  @Get('ready')
  @ApiOperation({ summary: 'Get readiness status' })
  @ApiResponse({
    status: 200,
    description: 'Readiness status retrieved successfully',
  })
  getReady() {
    return this.healthService.getReadyStatus();
  }

  @Get('live')
  @ApiOperation({ summary: 'Get readiness status' })
  @ApiResponse({
    status: 200,
    description: 'Readiness status retrieved successfully',
  })
  getLive() {
    return this.healthService.getLiveStatus();
  }
}
