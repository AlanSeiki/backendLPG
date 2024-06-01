import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMetaDto {
    id: number;

    @IsString()
    @IsNotEmpty({message: 'Digíte uma descrição para criar a meta!'})
    descricao: string;

    @IsDateString()
    @IsNotEmpty({message: 'Digíte uma data inicial para criar a meta!'})
    data_inicial: Date;

    @IsDateString()
    @IsNotEmpty({message: 'Digíte uma data final para criar a meta!'})
    data_final: Date;

    @IsNumber()
    @IsNotEmpty({message: 'Digíte o valor para criar a meta!'})
    valor: number;

    @IsNumber()
    @IsNotEmpty({message: 'Digíte uma valor por mês para criar a meta!'})
    valor_mes: number;

    @IsString()
    @IsNotEmpty({message: 'Escolha um ícone para criar a meta!'})
    icone: string;

    @IsBoolean()
    @IsNotEmpty({message: 'Determine se está ativo para criar a meta!'})
    ativo: boolean;
}

export interface interfaceMeta{
    descricao: string;
    data_inicial: Date;
    data_final: Date;
    valor: number;
    valor_mes: number;
    icone: string;
    ativo: boolean;
}
