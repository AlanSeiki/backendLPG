import { Module } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoController } from './movimentacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacao.entity';
import { PaginationService } from 'src/paginate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao])],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService, PaginationService],
  exports: [MovimentacaoService]
})
export class MovimentacaoModule { }
