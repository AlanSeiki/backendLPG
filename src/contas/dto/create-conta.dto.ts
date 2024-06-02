import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContaDto {
    id: number;

    @IsString()
    @IsNotEmpty({message: 'Digíte uma descrição para criar a conta!'})
    descricao: string;

    @IsDateString()
    @IsNotEmpty({message: 'Digíte a data  para criar a conta!'})
    data: Date;

    @IsNumber()
    @IsNotEmpty({message: 'Digíte a parcela  para criar a conta!'})
    parcela: number;

    @IsNumber()
    @IsNotEmpty({message: 'Digíte a parcela  para criar a conta!'})
    valor: number;

    @IsNotEmpty({message: 'Escolha uma icone para criar a conta!'})
    icone: string;
}

export interface interfaceConta{
    descricao: string;
    data: Date;
    parcela: number;
    valor: number;
    icone: string;
}
