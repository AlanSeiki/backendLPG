import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovimentacaoDto, interfaceMovimentacao } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimentacaoEntity } from './entities/movimentacao.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class MovimentacaoService {

  constructor(
    @InjectRepository(MovimentacaoEntity)
    private moviRepository: Repository<MovimentacaoEntity>
  ) { }

  async findDesc(descricao: string): Promise<boolean> {
    return (await this.moviRepository.find({ where: { descricao: descricao } })).length > 0
  }

  async create(movi: CreateMovimentacaoDto): Promise<string | Error> {
    try {
      if (await this.findDesc(movi.descricao)) {
        throw new Error(`Movimentação com a descrição "${movi.descricao}" já existe`);
      }

      if (
        (!movi.conta && !movi.meta) || (movi.conta && movi.meta)
      ) {
        throw new Error(`Deve ser escolhido apenas meta ou conta`);
      }

      await this.moviRepository.create(movi);

      return `Movimentação criada com sucesso`
    } catch (error) {
      throw new HttpException(`Erro ao criar movimentação: ${error.message}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`Erro ao buscar movimentação: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<CreateMovimentacaoDto | Error> {
    try {
      if (!await this.moviRepository.existsBy({ id })) {
        throw new Error(`A movimentação buscada não existe`);
      }

      return await this.moviRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(`Erro ao buscar movimentação: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, movi: UpdateMovimentacaoDto): Promise<string | Error> {
    try {
      const found = await this.moviRepository.findOne({ where: { id } })

      if (!found) {
        throw new Error(`Movimentação não encontrada`)
      }

      await this.moviRepository.update(id, movi);
      return `Movimentação atualizada com sucesso`
    } catch (error) {
      throw new HttpException(`Erro ao atualizar Movimentação: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<string | Error> {
    try {

      if (!await this.moviRepository.existsBy({ id })) {
        throw new Error(`A movimentação com o id "${id}" não foi encontrada!`)
      }

      await this.moviRepository.delete(id)

      return `Movimentação removida com sucesso`
    } catch (error) {
      throw new HttpException(`Erro ao excluir a movimentação: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
