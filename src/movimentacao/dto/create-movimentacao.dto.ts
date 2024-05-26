import { IsNotEmpty, IsString, IsNumber } from "class-validator";
export class MovimentacaoDto {
    id: number;

    @IsString()
    @IsNotEmpty({message: "Necessário colocar uma descrição"})
    descricao: string;

    @IsString()
    @IsNotEmpty({message: "Necessário escolher uma data"})
    data: Date;

    conta: number;

    @IsNotEmpty({message: "Necessário colocar um valor"})
    valor: number;

    @IsString()
    @IsNotEmpty({message: "Necessário selecionar um icone"})
    icone: string;

    meta: number;

    @IsString()
    @IsNotEmpty({message: "Necessário selecionar o tipo de movimentação"})
    tipo: string;
}