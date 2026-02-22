import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { corsOriginValidator } from './utils/cors-validator';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
      },
    }),
  );

  // Configuration cors
  app.enableCors({
    origin: corsOriginValidator,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeads: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Acess-Control-Allow-Origin',
      'Acess-Control-Allow-Methods',
      'Acess-Control-Allow-Headers',
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuration Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('E-commerce API Gateway')
    .setDescription(
      `
      API Gateway para sistema E-commerce com microservices.
      
      Serviços Disponíveis:
      - Users Service: Gerenciamento de usuários, autenticação e autorização.
      - Products Service: Gerenciamento de produtos, categorias e estoque.
      - Checkout Service: Processamento de pedidos, pagamentos e histórico de compras.
      - Payments Service: Integração com gateways de pagamento, processamento de transações e gerenciamento de métodos de pagamento.

      Autenticação:
      - Utiliza JWT Bearer token para rotas protegidas.
      - Use Session token para validação de sessão
    `,
    )
    .setVersion('1.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token to access protected routes',
        in: 'header',
      },
      'JWT-Auht',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-session-token',
        in: 'header',
        description: 'Session token for use validations',
      },
      'Session-Token',
    )
    .addTag(
      'Authentication',
      'Endpoints relacionados à autenticação e registro de usuários',
    )
    .addTag('Users', 'Endpoints relacionados ao gerenciamento de usuários')
    .addTag(
      'Products',
      'Endpoints relacionados ao gerenciamento de produtos e categorias',
    )
    .addTag(
      'Checkout',
      'Endpoints relacionados ao processamento de pedidos e histórico de compras',
    )
    .addTag(
      'Payments',
      'Endpoints relacionados à integração de pagamentos e gerenciamento de métodos de pagamento',
    )
    .addTag(
      'Health',
      'Endpoints relacionados à verificação de saúde do sistema',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 API Gateway running on port ${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/docs`);
}
bootstrap();
