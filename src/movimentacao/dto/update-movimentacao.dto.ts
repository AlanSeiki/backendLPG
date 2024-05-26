import { PartialType } from '@nestjs/mapped-types';
import { MovimentacaoDto } from './create-movimentacao.dto';

export class UpdateMovimentacaoDto extends PartialType(MovimentacaoDto) {}
