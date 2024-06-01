import { Module } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoController } from './movimentacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentacaoEntity } from './entities/movimentacao.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MovimentacaoEntity])],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
})
export class MovimentacaoModule {}
