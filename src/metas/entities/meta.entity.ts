import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meta {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    descricao: string;
  
    @Column()
    data_inicial: Date;
  
    @Column()
    data_final: Date;
  
    @Column()
    valor: number;

    @Column()
    valor_mes: number;
  
    @Column()
    icone: string;

    @Column({ default: true })
    ativo: boolean;
}
