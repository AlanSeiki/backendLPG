import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { CreateMovimentacaoDto, interfaceMovimentacao } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { PaginatedResultDto } from 'src/dto-paginate/paginate.dto';

@Controller('movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) { }

  @Post()
  async create(@Body() createMovimentacaoDto: MovimentacaoDto): Promise<MovimentacaoDto | Error> {
    return await this.movimentacaoService.create(createMovimentacaoDto);
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400 })) page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 })) limit: number = 10
  ): Promise<PaginatedResultDto<MovimentacaoDto>> {
    return await this.movimentacaoService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CreateMovimentacaoDto | Error> {
    return this.movimentacaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() movi: UpdateMovimentacaoDto) {
    return this.movimentacaoService.update(id, movi);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string | Error> {
    return this.movimentacaoService.remove(id);
  }
}
