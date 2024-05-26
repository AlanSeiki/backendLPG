import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';

@Injectable()
export class MetasService {
  create(createMetaDto: CreateMetaDto) {
    try {
      if (new Date(createMetaDto.data_inicial) < new Date()) {
        throw new Error('A data inicial deve ser maior que hoje.');
      } else if (new Date(createMetaDto.data_inicial) <= new Date(createMetaDto.data_final)) {
        throw new Error("Data final deve ser maior que a data inicial.")
      }
    } catch (error) {
      throw new NotFoundException(`Erro ao salvar meta ${error.message}`);
    }
    return 'This action adds a new meta';
  }

  findAll() {
    return `This action returns all metas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meta`;
  }

  update(id: number, updateMetaDto: UpdateMetaDto) {
    return `This action updates a #${id} meta`;
  }

  remove(id: number) {
    return `This action removes a #${id} meta`;
  }
}
