import { IsNotEmpty, IsString, IsPositive, IsEnum, IsNumber, IsDateString, IsBoolean } from "class-validator";

export class CreateMetaDto {
    id: number;
  
    @IsString()
    descricao: string;
  
    @IsString({message: "Campo data é do tipo String"})
    @IsNotEmpty({message: "Necessário escolher uma data_inicial"})
    @IsDateString()
    data_inicial: Date;
  
    @IsString({message: "Campo data é do tipo String"})
    @IsNotEmpty({message: "Necessário escolher uma data_final"})
    @IsDateString()
    data_final: Date;
  
    @IsNotEmpty({message: "Necessário colocar um valor"})
    @IsNumber()
    @IsPositive({message: "valor deve ser maior que 0"})
    valor: number;

    @IsNotEmpty({message: "Necessário colocar um valor_mes"})
    @IsNumber()
    @IsPositive({message: "valor_mes deve ser maior que 0"})
    valor_mes: number;
  
    @IsString({message: "Campo icone é do tipo String"})
    @IsNotEmpty({message: "Necessário selecionar um icone"})
    icone: string;

    @IsBoolean({message: "Campo ativo deve ser do tipo boolean"})
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