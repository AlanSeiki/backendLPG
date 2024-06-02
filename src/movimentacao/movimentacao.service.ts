import { Injectable } from '@nestjs/common';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimentacaoEntity } from './entities/movimentacao.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Movimentacao } from './entities/movimentacao.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/paginate.service';
import { PaginatedResultDto } from 'src/dto-paginate/paginate.dto';

@Injectable()
export class MovimentacaoService {
  constructor(
    @InjectRepository(Movimentacao)
    private movimentacaoRepository: Repository<Movimentacao>,
    private paginationService: PaginationService
  ) {

  }
  
  async create(createMovimentacaoDto: MovimentacaoDto): Promise< MovimentacaoDto | Error> {
    try {
       return await this.movimentacaoRepository.save(createMovimentacaoDto);
    } catch (error) {
      throw new NotFoundException(`Erro ao salvar movimentação ${error.message}`);
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<PaginatedResultDto<MovimentacaoDto>> {
    const { LessThanOrEqual } = require('typeorm');

    const paginatedResult = await this.paginationService.paginate(this.movimentacaoRepository, page, limit, {
      where: { data: LessThanOrEqual(new Date()) },
      order: { data: 'DESC' }
    });

    return paginatedResult
  }

  findOne(id: number) {
    return `This action returns a #${id} movimentacao`;
  }

  update(id: number, updateMovimentacaoDto: UpdateMovimentacaoDto) {
    return `This action updates a #${id} movimentacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimentacao`;
  }
}
