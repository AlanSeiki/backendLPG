import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { CreateMovimentacaoDto, interfaceMovimentacao } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { PaginatedResultDto } from 'src/dto-paginate/paginate.dto';

interface DadosAgrupadosPorMes {
  mes: string;
  soma: number;
}
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
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 })) limit: number = 10,
    @Query('dataFinal') dataFinal: string,
    @Query('dataInicial') dataInicial: string,
    @Query('tipo') tipo: string,
    @Query('conta') conta: any,
    @Query('meta') meta: any
  ): Promise<PaginatedResultDto<CreateMovimentacaoDto>> {
    
    const params = { dataFinal, dataInicial, tipo, conta, meta };
        
    return await this.movimentacaoService.findPaginate(page, limit, params);
  }
  


  @Get()
  findAll(@Query() params: interfaceMovimentacao): Promise<CreateMovimentacaoDto[]> {
    return this.movimentacaoService.findAll(params);
  }
  @Get('/lucro_despesa')
  async getDespesaLucro(): Promise<any> {
     const retorno = await this.movimentacaoService.getDespesaLucro();
     return retorno
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CreateMovimentacaoDto | Error> {
    return this.movimentacaoService.findOne(id);
  }

  @Get('movientacaoPorMes/:id')
  async mapDadosAgrupadosPorMes(@Param('id') id: number): Promise<any> {
    return await this.movimentacaoService.mapDadosAgrupadosPorMes(id);
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
