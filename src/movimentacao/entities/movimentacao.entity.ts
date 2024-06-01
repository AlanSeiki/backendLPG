
import { ContaEntity } from 'src/contas/entities/conta.entity';
import {  MetaEntity } from 'src/metas/entities/meta.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "movimentacao"})
export class MovimentacaoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'character varying', nullable: false})
  descricao: string;

  @Column({type: 'timestamptz', nullable: false})
  data: Date;

  @Column({type: 'integer',nullable: true})
  @ManyToOne(() => ContaEntity, (conta) => conta.id)
  @JoinColumn()
  conta: ContaEntity;

  @Column({type: 'integer', nullable: false})
  valor: number;

  @Column({type: 'character varying', nullable: false})
  icone: string;

  @Column({type: 'integer', nullable: true})
  @ManyToOne(() => MetaEntity, (meta) => meta.id)
  @JoinColumn()
  meta: MetaEntity;

  @Column({type: 'character varying', nullable: false})
  tipo: string;
}