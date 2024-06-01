import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ContaEntity } from "src/contas/entities/conta.entity";
import { MetaEntity } from "src/metas/entities/meta.entity";

export class CreateMovimentacaoDto {
    id: number;

    @IsString()
    @IsNotEmpty({message: 'Digíte uma descrição para criar a movimentação!'})
    descricao: string;

    @IsDateString()
    @IsNotEmpty({message: 'Digíte uma data para criar a movimentação!'})
    data: Date;

    conta?: ContaEntity;

    @IsNumber()
    @IsNotEmpty({message: 'Defina um valor para criar a movimentação!'})
    valor: number;

    @IsString()
    @IsNotEmpty({message: 'Escolha um ícone para criar a movimentação!'})
    icone: string;

    meta?: MetaEntity;

    @IsString()
    @IsNotEmpty({message: 'Digíte o tipo para criar a movimentação!'})
    tipo: string;
}

export interface interfaceMovimentacao{
    descricao: string;
    data: Date;
    conta: ContaEntity;
    valor: number;
    icone: string;
    meta: MetaEntity;
    tipo: string;
}
