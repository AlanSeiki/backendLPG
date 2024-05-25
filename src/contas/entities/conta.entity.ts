import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conta {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;

  @Column()
  data: Date;

  @Column()
  parcela: number;

  @Column()
  valor: number;

  @Column()
  icone: string;
}