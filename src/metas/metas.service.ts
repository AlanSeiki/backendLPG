import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMetaDto, interfaceMeta } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaEntity } from './entities/meta.entity';

@Injectable()
export class MetasService {

  constructor(
    @InjectRepository(MetaEntity)
    private metaRepository: Repository<MetaEntity>
  ) { }

  async findDesc(descricao: string): Promise<boolean> {
    return (await this.metaRepository.find({ where: { descricao: descricao } })).length > 0
  }

  async create(meta: CreateMetaDto): Promise<string | Error> {
    try {
      if (await this.findDesc(meta.descricao)) {
        throw new Error(`Meta com a descrição "${meta.descricao}" já esxiste`);
      }

      await this.metaRepository.save(meta);

      return `Meta "${meta.descricao}" criada com sucesso`
    } catch (error) {
      throw new HttpException(`Erro ao criar meta: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(params: interfaceMeta): Promise<CreateMetaDto[]> {
    try {
      const searchParams: FindOptionsWhere<MetaEntity> = {}

      if (params.descricao) {
        searchParams.descricao = ILike(`%${params.descricao}%`);
      }

      return await this.metaRepository.find({ where: searchParams });

    } catch (error) {
      throw new HttpException(`Erro ao buscar meta: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<CreateMetaDto | Error> {
    try {
      if (!await this.metaRepository.existsBy({ id })) {
        throw new Error(`A meta buscada não existe`);
      }

      return await this.metaRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(`Erro ao buscar meta: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, meta: UpdateMetaDto): Promise<string | Error> {
    try {
      const found = await this.metaRepository.findOne({ where: { id } })

      if (!found) {
        throw new Error(`Meta não encontrada`)
      }

      await this.metaRepository.update(id, meta);
      return `Meta atualizada com sucesso`
    } catch (error) {
      throw new HttpException(`Erro ao atualizar meta: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<string | Error> {
    try {

      if (!await this.metaRepository.existsBy({ id })) {
        throw new Error(`A meta com o id "${id}" não foi encontrada!`)
      }

      await this.metaRepository.delete(id)

      return `Meta removida com sucesso`
    } catch (error) {
      throw new HttpException(`Erro ao excluir a meta: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
