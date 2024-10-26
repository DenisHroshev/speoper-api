import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OperationsModule } from './modules/operations/operations.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransportsModule } from './modules/transports/transports.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'speoper-1.cfkmusugc9kv.eu-north-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'k738D4NTyapGSX7MCzeC',
      database: 'speoper-db1',
      entities: ['../**/*.entity.{js, ts}'],
      // autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
      logging: true,
    }),
    OperationsModule,
    AuthModule,
    TransportsModule,
    AiModule,
  ],
  providers: [],
})
export class AppModule {}
