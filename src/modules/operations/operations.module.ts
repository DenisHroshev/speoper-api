import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';
import { Transport } from '../transports/entitites/transport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operation, Transport])],
  controllers: [OperationsController],
  providers: [OperationsService],
})
export class OperationsModule {}
