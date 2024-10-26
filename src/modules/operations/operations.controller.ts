import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get()
  getAllOperations() {
    return this.operationsService.getAllOperations();
  }

  @Get(':id')
  getSingleOperation(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.getSingleOperation(id);
  }

  @Post()
  addOperation(@Body() createOperationDto: CreateOperationDto) {
    return this.operationsService.addOperation(createOperationDto);
  }

  @Patch(':id')
  modifyOperation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.modifyOperation(id, updateOperationDto);
  }

  @Delete(':id')
  deleteOperation(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.deleteOperation(id);
  }
}
