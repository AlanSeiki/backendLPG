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
  ) {}

  async findDesc(descricao: string): Promise<boolean> {
    return (await this.metaRepository.find({ where: { descricao: descricao } })).length > 0
  }

  async create(meta: CreateMetaDto): Promise<{ message: string } | Error> {
    try {
      const intervaloData =  new Date(meta.data_final).getMonth() - new Date(meta.data_inicial).getMonth()


      if (new Date(meta.data_inicial) > new Date(meta.data_final)) {
        throw new Error(`A data inicial deve ser menor ou igual que a data final`);
      }

      if (await this.findDesc(meta.descricao)) {
        throw new Error(`Meta com a descrição "${meta.descricao}" já esxiste!`);
      }

      if (((new Date(meta.data_final).getFullYear()) - (new Date(meta.data_inicial).getFullYear())) > 2) {
        throw new Error(`O intervalo das datas deve ser menor que 2 anos!`)
      }

      if (intervaloData < 1) {
        throw new Error(`O intervalo das Datas deve ser maior ou igual a 1 mês!`)
      }


      meta.valor_mes = Math.round(meta.valor / intervaloData)
      

      await this.metaRepository.save(meta);
      return { message: `Meta criada com sucesso!` }
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<CreateMetaDto | Error> {
    try {
      if (!await this.metaRepository.existsBy({ id })) {
        throw new Error(`A meta buscada não existe!`);
      }

      return await this.metaRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findOneEntity(id: number): Promise<MetaEntity> {
    try {
      if (!await this.metaRepository.existsBy({ id })) {
        throw new Error(`A meta buscada não existe!`);
      }

      return await this.metaRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }


  async update(id: number, meta: UpdateMetaDto): Promise<{ message: string } | Error> {
    try {
      const found = await this.metaRepository.findOne({ where: { id } })

      if (!found) {
        throw new Error(`Meta não encontrada!`)
      }

      await this.metaRepository.update(id, meta);
      return { message: `Meta atualizada com sucesso!` }
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<{ message: string } | Error> {
    try {

      if (!await this.metaRepository.existsBy({ id })) {
        throw new Error(`A meta com o id "${id}" não foi encontrada!`)
      }

      await this.metaRepository.delete(id)

      return { message: `Meta removida com sucesso` }
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
