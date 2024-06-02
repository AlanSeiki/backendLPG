import { IsNotEmpty, IsString, IsPositive, IsEnum, IsNumber, IsDateString } from "class-validator";
import { ContaEntity } from "src/contas/entities/conta.entity";
import { MetaEntity } from "src/metas/entities/meta.entity";

export enum TipoMovimentacao {
    DESPESA = 'D',
    RECEITA = 'R',
    LANCAMENTO = 'L'
}
export class CreateMovimentacaoDto {
    id: number;

    @IsString({message: "Campo descricao é do tipo String"})
    @IsNotEmpty({message: "Necessário colocar uma descrição"})
    descricao: string;

    @IsString({message: "Campo data é do tipo String"})
    @IsNotEmpty({message: "Necessário escolher uma data"})
    @IsDateString()
    data: Date;

    conta?: ContaEntity;

    @IsNotEmpty({message: "Necessário colocar um valor"})
    @IsNumber()
    @IsPositive({message: "Valor deve ser maior que 0"})
    valor: number;

    @IsString({message: "Campo icone é do tipo String"})
    @IsNotEmpty({message: "Necessário selecionar um icone"})
    icone: string;

    meta?: MetaEntity;

    @IsEnum(TipoMovimentacao, { message: "Tipo de movimentação inválido. Os valores permitidos são: D, M, L." })
    @IsNotEmpty({message: "Necessário selecionar o tipo de movimentação"})
    tipo: TipoMovimentacao;
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