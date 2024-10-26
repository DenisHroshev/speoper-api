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

import { TransportsService } from './transports.service';
import { CreateTransportDto } from './dtos/create-transport.dto';
import { UpdateTransportDto } from './dtos/update-transport.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('transports')
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllTransports() {
    return this.transportsService.getAllTransports();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getSingleTransport(@Param('id', ParseIntPipe) id: number) {
    return this.transportsService.getSingleTransport(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  addTransport(@Body() createTransportDto: CreateTransportDto) {
    return this.transportsService.addTransport(createTransportDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modifyTransport(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransportDto: UpdateTransportDto,
  ) {
    return this.transportsService.modifyTransport(id, updateTransportDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteTransport(@Param('id', ParseIntPipe) id: number) {
    return this.transportsService.deleteTransport(id);
  }
}
