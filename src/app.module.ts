import { Module } from '@nestjs/common';
import { PaginationService } from './paginate.service';
import { MovimentacaoModule } from './movimentacao/movimentacao.module';
import { ContasModule } from './contas/contas.module';
import { MetasModule } from './metas/metas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [MovimentacaoModule, ContasModule, MetasModule,TypeOrmModule.forRoot(dataSourceOptions),],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
