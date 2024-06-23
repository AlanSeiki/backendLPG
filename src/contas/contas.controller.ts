import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto, interfaceConta } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { PaginatedResultDto } from 'src/dto-paginate/paginate.dto';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) { }

  @Post()
  async create(@Body() conta: CreateContaDto): Promise<{ message: string } | Error> {
    return await this.contasService.create(conta);
  }

  @Get('/paginate')
  async findPaginate(
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400 })) page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 })) limit: number = 10
  ): Promise<PaginatedResultDto<CreateContaDto>> {
    return await this.contasService.findPaginate(page, limit);
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
  async update(@Param('id') id: number, @Body() conta: UpdateContaDto): Promise<{ message: string } | Error> {
    return await this.contasService.update(id, conta);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string } | Error> {
    return await this.contasService.remove(id);
  }
}
