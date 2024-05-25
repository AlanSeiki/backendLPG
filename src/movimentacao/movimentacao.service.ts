import { Injectable } from '@nestjs/common';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { Movimentacao } from './entities/movimentacao.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovimentacaoService {
  constructor(
    @InjectRepository(Movimentacao)
    private movimentacaoRepository: Repository<Movimentacao>
  ){

  }
  create(createMovimentacaoDto: CreateMovimentacaoDto) {
    return 'This action adds a new movimentacao';
  }

  findAll() {
    return this.movimentacaoRepository.find({order:{'data':'ASC'}});
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
