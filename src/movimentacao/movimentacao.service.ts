/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovimentacaoDto, interfaceMovimentacao } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimentacaoEntity } from './entities/movimentacao.entity';
import { Between, FindOptionsWhere, ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { PaginationService } from 'src/paginate.service';
import { PaginatedResultDto } from 'src/dto-paginate/paginate.dto';
import { TipoMovimentacao } from './movimentacao.enum';
import { CreateContaDto } from 'src/contas/dto/create-conta.dto';
import { LessThanOrEqual } from 'typeorm';
import { MetasService } from 'src/metas/metas.service';
import { CreateMetaDto } from 'src/metas/dto/create-meta.dto';
import { MetaEntity } from 'src/metas/entities/meta.entity';

interface DadosAgrupadosPorMes {
  mes: string;
  soma: number;
}
@Injectable()
export class MovimentacaoService {


  constructor(
    @InjectRepository(MovimentacaoEntity)
    private readonly moviRepository: Repository<MovimentacaoEntity>,
    private readonly paginationService: PaginationService,
    private readonly metaService: MetasService,
  ) { }

  async findDesc(descricao: string): Promise<boolean> {
    return (await this.moviRepository.find({ where: { descricao: descricao } })).length > 0
  }

  isValidTipoMovimentacao(value: string): value is TipoMovimentacao {
    return (Object.values(TipoMovimentacao) as string[]).includes(value);
  }

  async create(movi: CreateMovimentacaoDto): Promise<{ message: string } | Error> {
    try {
      if (!this.isValidTipoMovimentacao(movi.tipo)) {
        throw new Error(`O tipo de movimentação deve ser "Lucro", "Despesa" ou "Meta"!`)
      }
      if(movi.tipo == 'M' && !movi.meta) {
        throw new Error(`Para enserir um tipo meta deve se enviar uma Meta!`)
      }
      const movimentacao = await this.moviRepository.create(movi);
      await this.moviRepository.save(movimentacao);
      return { message: 'Movimentação criada com sucesso!' };
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(param: interfaceMovimentacao): Promise<CreateMovimentacaoDto[]> {
    try {
      const searchParams: FindOptionsWhere<MovimentacaoEntity> = {}

      if (param.descricao) {
        searchParams.descricao = ILike(`%${param.descricao}%`);
      }
    
      return await this.moviRepository.find({ where: searchParams, relations: ['conta', 'meta']});

    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async getDespesaLucro(): Promise<any> {
    try {
      const dataAtual = new Date();

      const result = await this.moviRepository
        .createQueryBuilder('movimentacao')
        .select('movimentacao.tipo', 'tipo')
        .addSelect('SUM(movimentacao.valor)', 'total')
        .where('movimentacao.data <= :dataAtual', { dataAtual })
        .groupBy('movimentacao.tipo')
        .getRawMany();

      return result;
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findPaginate(page: number = 1, limit: number = 10, params: any): Promise<PaginatedResultDto<CreateMovimentacaoDto>> {
    const searchConditions: any = {};

    if (params.dataInicial && params.dataFinal) {
      searchConditions.data = Between(new Date(params.dataInicial), new Date(params.dataFinal));
    } else if (params.dataInicial) {
      searchConditions.data = MoreThanOrEqual(new Date(params.dataInicial));
    } else if (params.dataFinal) {
      searchConditions.data = LessThanOrEqual(new Date(params.dataFinal));
    } else {
      searchConditions.data = LessThanOrEqual(new Date());
    }
  
    if (params.tipo) {
      searchConditions.tipo = params.tipo;
    }
  
    if (params.meta && params.meta !== 'undefined' && params.meta !== '') {
      searchConditions.meta = { id: params.meta }; // Certifique-se de que isso corresponda à estrutura correta
    }
  
    if (params.conta && params.conta !== 'undefined' && params.conta !== '') {
      searchConditions.conta = { id: params.conta }; // Certifique-se de que isso corresponda à estrutura correta
    }
  
    const paginatedResult = await this.paginationService.paginate(this.moviRepository, page, limit, {
      where: searchConditions,
      order: { data: 'DESC' },
      relations: ['conta', 'meta']
    });
   
    return paginatedResult;
  }
  
  

  async findOne(id: number): Promise<CreateMovimentacaoDto | Error> {
    try {
      const procuraId = await this.moviRepository.findOne({ where: { id }, relations: ['conta', 'meta'] });

      if (!procuraId) {
        throw new Error(`A movimentação buscada não existe!`);
      }

      return procuraId
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, movi: UpdateMovimentacaoDto): Promise<{ message: string } | Error> {
    try {
      if (!await this.moviRepository.existsBy({ id })) {
        throw new Error(`Movimentação não encontrada`)
      }

      await this.moviRepository.update(id, movi);
      return { message: `Movimentação atualizada com sucesso!` }
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<{ message: string } | Error> {
    try {

      if (!await this.moviRepository.existsBy({ id })) {
        throw new Error(`A movimentação com o id "${id}" não foi encontrada!`)
      }

      await this.moviRepository.delete(id)

      return { message: `Movimentação removida com sucesso` }
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async removeContaId(conta: CreateContaDto): Promise<{ message: string } | Error> {
    try {
      const { id } = conta;
      await this.moviRepository.delete({ conta: { id } });
      return { message: 'Movimentações associadas à conta removidas com sucesso.' };
    } catch (error) {
      return new Error('Erro ao remover as movimentações associadas à conta.');
    }
  }

 async mapDadosAgrupadosPorMes(id: number) {
    const meta = await this.metaService.findOneEntity(id);

    const dadosFiltrados = await this.moviRepository.find({where: {meta: meta} });
    
    const dadosAgrupados: DadosAgrupadosPorMes[] = [];
    
    dadosFiltrados.forEach(item => {
      const mes = new Date(item.data).toISOString().slice(0, 7); // Obtém o ano e o mês
      const indice = dadosAgrupados.findIndex(x => x.mes === mes);

      if (indice !== -1) {
        // Se o mês já existe, adiciona o valor ao total existente
        dadosAgrupados[indice].soma += item.valor;
      } else {
        // Se o mês não existe, cria um novo objeto de mês
        dadosAgrupados.push({ mes, soma: item.valor });
      }
    });

    return dadosAgrupados;
  }
}