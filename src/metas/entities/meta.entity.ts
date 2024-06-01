import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'meta'})
export class MetaEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({type: 'character varying', nullable: false})
    descricao: string;
  
    @Column({type: 'timestamp', nullable: false})
    data_inicial: Date;
  
    @Column({type: 'timestamp', nullable: false})
    data_final: Date;
  
    @Column({type: 'integer', nullable: false})
    valor: number;

    @Column({type: 'integer', nullable: false})
    valor_mes: number;
  
    @Column({type: 'character varying', nullable: false})
    icone: string;

    @Column({ default: true })
    ativo: boolean;
}
