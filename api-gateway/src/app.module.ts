import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 6000, // 1 min
        limit: 100 // 100 request por minuto
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
