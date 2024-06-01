import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto, interfaceConta } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) { }

  @Post()
  async create(@Body() conta: CreateContaDto): Promise<string | Error> {
    return await this.contasService.create(conta);
  }

  @Get()
  async findAll(@Query() params: interfaceConta): Promise<CreateContaDto[]> {
    return await this.contasService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CreateContaDto | Error> {
    return await this.contasService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() conta: UpdateContaDto): Promise<string | Error> {
    return await this.contasService.update(id, conta);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string | Error> {
    return await this.contasService.remove(id);
  }
}
