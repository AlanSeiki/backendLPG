import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaEntity } from './entities/conta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContaEntity])],
  controllers: [ContasController],
  providers: [ContasService],
})
export class ContasModule {}
