import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from '../env';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: env.DATABASE_URL,
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
