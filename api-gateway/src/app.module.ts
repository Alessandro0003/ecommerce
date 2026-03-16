import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProxyModule } from './proxy/proxy.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import { AuthModule } from './auth/auth.module';
import { CustomThrottlerGuard } from './guards/throttler.guard';
import { APP_GUARD } from '@nestjs/core';
import { HealthCheckModule } from './common/health/health-check.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          name: 'short',
          ttl: 1000, // 1 segundo
          limit: configService.get<number>('RATE_LIMIT_SHORT', 10), // Valor padrão de 10 requisições por segundo
        },
        {
          name: 'medium',
          ttl: 60000, // 1 minuto
          limit: configService.get<number>('RATE_LIMIT_MEDIUM', 100), // Valor padrão de 100 requisições por minuto
        },
        {
          name: 'long',
          ttl: 900000, // 15 minutos
          limit: configService.get<number>('RATE_LIMIT_LONG', 1000), // Valor padrão de 1000 requisições por 15 minutos
        },
      ],
      inject: [ConfigService],
    }),
    ProxyModule,
    MiddlewareModule,
    AuthModule,
    HealthCheckModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // Aplica o middleware de logging a todas as rotas sem precisar passar rota por rota
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
