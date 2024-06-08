import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { CreateMovimentacaoDto, interfaceMovimentacao } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { PaginatedResultDto } from 'src/dto-paginate/paginate.dto';

@Controller('movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) { }

  @Post()
  async create(@Body() createMovimentacaoDto: CreateMovimentacaoDto): Promise<{ message: string } | Error> {
    return await this.movimentacaoService.create(createMovimentacaoDto);
  }

  @Get('/paginate')
  async findPaginate(
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400 })) page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 })) limit: number = 10
  ): Promise<PaginatedResultDto<CreateMovimentacaoDto>> {
    return await this.movimentacaoService.findPaginate(page, limit);
  }

  @Get()
  findAll(@Query() params: interfaceMovimentacao): Promise<CreateMovimentacaoDto[]> {
    return this.movimentacaoService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CreateMovimentacaoDto | Error> {
    return this.movimentacaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() movi: UpdateMovimentacaoDto): Promise<{ message: string } | Error> {
    return this.movimentacaoService.update(id, movi);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ message: string } | Error> {
    return this.movimentacaoService.remove(id);
  }
}
