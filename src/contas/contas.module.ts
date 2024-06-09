import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaEntity } from './entities/conta.entity';
import { MovimentacaoModule } from 'src/movimentacao/movimentacao.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContaEntity]),
    MovimentacaoModule
  ],
  controllers: [ContasController],
  providers: [ContasService,],
})
export class ContasModule {}
