import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { CreateMovimentacaoDto, interfaceMovimentacao } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';

@Controller('movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) { }

  @Post()
  create(@Body() movi: CreateMovimentacaoDto): Promise<string | Error> {
    return this.movimentacaoService.create(movi);
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
  update(@Param('id') id: number, @Body() movi: UpdateMovimentacaoDto) {
    return this.movimentacaoService.update(id, movi);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string | Error> {
    return this.movimentacaoService.remove(id);
  }
}
