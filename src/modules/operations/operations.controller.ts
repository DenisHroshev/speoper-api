import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllOperations() {
    return this.operationsService.getAllOperations();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getSingleOperation(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.getSingleOperation(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  addOperation(@Body() createOperationDto: CreateOperationDto) {
    return this.operationsService.addOperation(createOperationDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modifyOperation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.modifyOperation(id, updateOperationDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteOperation(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.deleteOperation(id);
  }
}
