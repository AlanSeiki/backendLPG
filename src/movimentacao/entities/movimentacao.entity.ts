
import { ContaEntity } from 'src/contas/entities/conta.entity';
import {  MetaEntity } from 'src/metas/entities/meta.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TipoMovimentacao } from '../dto/create-movimentacao.dto';

@Entity({name: "movimentacao"})
export class MovimentacaoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'character varying', nullable: false})
  descricao: string;

  @Column({type: 'timestamptz', nullable: false})
  data: Date;

  @ManyToOne(() => ContaEntity, (conta) => conta.movimentacao)
  @JoinColumn({ name: 'conta' })
  conta: ContaEntity;

  @Column({type: 'integer', nullable: false})
  valor: number;

  @Column({type: 'character varying', nullable: false})
  icone: string;

  @ManyToOne(() => MetaEntity, (meta) => meta.movimentacao)
  @JoinColumn({ name: 'meta' })
  meta: MetaEntity;

  @Column()
  tipo: TipoMovimentacao;
}