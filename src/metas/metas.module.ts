import { Module } from '@nestjs/common';
import { MetasService } from './metas.service';
import { MetasController } from './metas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaEntity } from './entities/meta.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MetaEntity])],
  controllers: [MetasController],
  providers: [MetasService],
  exports: [MetasService]
})
export class MetasModule {}
