import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from './entities/operation.entity';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';
import { Transport } from '../transports/entitites/transport.entity';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,

    @InjectRepository(Transport)
    private transportRepository: Repository<Transport>,
  ) {}

  private parseOperationBody(
    operation: CreateOperationDto | UpdateOperationDto,
  ): Operation {
    const preparedOperation = {
      ...operation,
    } as unknown as Operation;

    if (preparedOperation.transports) {
      preparedOperation.transports = preparedOperation.transports.map(
        (transportId) =>
          this.transportRepository.create({
            id: transportId as unknown as number,
          }),
      );
    }

    return preparedOperation;
  }

  async getAllOperations(): Promise<Operation[]> {
    return await this.operationRepository.find();
  }

  async getSingleOperation(id: number): Promise<Operation> {
    const transport = await this.operationRepository.findOne({
      where: { id },
      relations: { transports: true },
    });
    if (!transport) {
      throw new NotFoundException(`Operation with ID ${id} not found`);
    }
    return transport;
  }

  addOperation(createOperationDto: CreateOperationDto): Promise<Operation> {
    const preparedOperation = this.parseOperationBody(createOperationDto);
    const newOperation = this.operationRepository.create(preparedOperation);
    return this.operationRepository.save(newOperation);
  }

  async modifyOperation(
    id: number,
    updateOperationDto: UpdateOperationDto,
  ): Promise<Operation> {
    const operation = await this.getSingleOperation(id);

    const preparedOperation = this.parseOperationBody(updateOperationDto);

    const updatedOperation = this.operationRepository.merge(
      operation,
      preparedOperation,
    );

    if (preparedOperation.transports) {
      updatedOperation.transports = preparedOperation.transports;
    }

    await this.operationRepository.save(updatedOperation);

    return this.getSingleOperation(id);
  }

  async deleteOperation(id: number): Promise<void> {
    const transport = await this.getSingleOperation(id);
    await this.operationRepository.remove(transport);
  }
}
