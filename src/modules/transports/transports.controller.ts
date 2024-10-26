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

import { TransportsService } from './transports.service';
import { CreateTransportDto } from './dtos/create-transport.dto';
import { UpdateTransportDto } from './dtos/update-transport.dto';

@Controller('transports')
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) {}

  @Get()
  getAllTransports() {
    return this.transportsService.getAllTransports();
  }

  @Get(':id')
  getSingleTransport(@Param('id', ParseIntPipe) id: number) {
    return this.transportsService.getSingleTransport(id);
  }

  @Post()
  addTransport(@Body() createTransportDto: CreateTransportDto) {
    return this.transportsService.addTransport(createTransportDto);
  }

  @Patch(':id')
  modifyTransport(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransportDto: UpdateTransportDto,
  ) {
    return this.transportsService.modifyTransport(id, updateTransportDto);
  }

  @Delete(':id')
  deleteTransport(@Param('id', ParseIntPipe) id: number) {
    return this.transportsService.deleteTransport(id);
  }
}
