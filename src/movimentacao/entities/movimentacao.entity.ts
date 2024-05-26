import { Conta } from 'src/contas/entities/conta.entity';
import { Meta } from 'src/metas/entities/meta.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TipoMovimentacao } from '../dto/create-movimentacao.dto';

@Entity()
export class Movimentacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;

  @Column()
  data: Date;

  @ManyToOne(() => Conta, (conta) => conta.id, { nullable: true })
  @JoinColumn()
  conta: number;

  @Column()
  valor: number;

  @Column()
  icone: string;

  @ManyToOne(() => Meta, (meta) => meta.id, { nullable: true })
  @JoinColumn()
  meta: number;

  @Column()
  tipo: TipoMovimentacao;
}