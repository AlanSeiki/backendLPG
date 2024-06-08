/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovimentacaoDto, interfaceMovimentacao } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimentacaoEntity } from './entities/movimentacao.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { PaginationService } from 'src/paginate.service';
import { PaginatedResultDto } from 'src/dto-paginate/paginate.dto';
import { TipoMovimentacao } from './movimentacao.enum';

@Injectable()
export class MovimentacaoService {

  constructor(
    @InjectRepository(MovimentacaoEntity)
    private moviRepository: Repository<MovimentacaoEntity>,
    private paginationService: PaginationService,
  ) { }

  async findDesc(descricao: string): Promise<boolean> {
    return (await this.moviRepository.find({ where: { descricao: descricao } })).length > 0
  }

  async create(movi: CreateMovimentacaoDto): Promise<{ message: string } | Error> {
    try {

      if (!(movi.tipo in TipoMovimentacao)) {
        throw new Error(`O tipo de movimentação deve ser "Lucro", "Despesa" ou "Meta"!`)
      }


      await this.moviRepository.save(movi);
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

      return await this.moviRepository.find({ where: searchParams });

    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findPaginate(page: number = 1, limit: number = 10): Promise<PaginatedResultDto<CreateMovimentacaoDto>> {
    const { LessThanOrEqual } = require('typeorm');

    const paginatedResult = await this.paginationService.paginate(this.moviRepository, page, limit, {
      where: { data: LessThanOrEqual(new Date()) },
      order: { data: 'DESC' }
    });

    return paginatedResult
  }

  async findOne(id: number): Promise<CreateMovimentacaoDto | Error> {
    try {
      const procuraId = await this.moviRepository.findOne({ where: { id } });

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
}