
import { ContaEntity } from 'src/contas/entities/conta.entity';
import {  MetaEntity } from 'src/metas/entities/meta.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movimentacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;

  @Column()
  data: Date;

  @Column({nullable: true})
  @ManyToOne(() => ContaEntity, (conta) => conta.id)
  @JoinColumn()
  conta: number;

  @Column()
  valor: number;

  @Column()
  icone: string;

  @Column({nullable: true})
  @ManyToOne(() => MetaEntity, (meta) => meta.id)
  @JoinColumn()
  meta: number;

  @Column()
  tipo: string;
}