import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'conta'})
export class ContaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'character varying', nullable: false})
  descricao: string;

  @Column({type: 'timestamp', nullable: false})
  data: Date;

  @Column({type: 'integer', nullable: false})
  parcela: number;

  @Column({type: 'integer', nullable: false})
  valor: number;

  @Column({type: 'character varying', nullable: false})
  icone: string;
}