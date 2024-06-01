import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MetasService } from './metas.service';
import { CreateMetaDto, interfaceMeta } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';

@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  @Post()
  create(@Body() meta: CreateMetaDto) {
    return this.metasService.create(meta);
  }

  @Get()
  findAll(@Query() params: interfaceMeta):Promise<CreateMetaDto[]> {
    return this.metasService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CreateMetaDto | Error> {
    return this.metasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() meta: UpdateMetaDto): Promise<string | Error> {
    return this.metasService.update(id, meta);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string | Error>  {
    return this.metasService.remove(id);
  }
}
