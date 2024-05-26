import { IsNotEmpty, IsString, IsPositive, IsEnum, IsNumber, IsDateString } from "class-validator";

export enum TipoMovimentacao {
    DESPESA = 'D',
    RECEITA = 'R',
    LANCAMENTO = 'L'
}
export class MovimentacaoDto {
    id: number;

    @IsString({message: "Campo descricao é do tipo String"})
    @IsNotEmpty({message: "Necessário colocar uma descrição"})
    descricao: string;

    @IsString({message: "Campo data é do tipo String"})
    @IsNotEmpty({message: "Necessário escolher uma data"})
    @IsDateString()
    data: Date;

    conta: number;

    @IsNotEmpty({message: "Necessário colocar um valor"})
    @IsNumber()
    @IsPositive({message: "Valor deve ser maior que 0"})
    valor: number;

    @IsString({message: "Campo icone é do tipo String"})
    @IsNotEmpty({message: "Necessário selecionar um icone"})
    icone: string;

    meta: number;

    @IsEnum(TipoMovimentacao, { message: "Tipo de movimentação inválido. Os valores permitidos são: D, M, L." })
    @IsNotEmpty({message: "Necessário selecionar o tipo de movimentação"})
    tipo: TipoMovimentacao;
}