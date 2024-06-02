import { Module } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoController } from './movimentacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentacaoEntity } from './entities/movimentacao.entity';
import { PaginationService } from 'src/paginate.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovimentacaoEntity])],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService, PaginationService],
  exports: [MovimentacaoService]
})
export class MovimentacaoModule { }
