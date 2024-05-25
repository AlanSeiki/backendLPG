import { Conta } from 'src/contas/entities/conta.entity';
import { Meta } from 'src/metas/entities/meta.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movimentacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;

  @Column()
  data: Date;

  @Column({nullable: true})
  @ManyToOne(() => Conta, (conta) => conta.id)
  @JoinColumn()
  conta: number;

  @Column()
  valor: number;

  @Column()
  icone: string;

  @Column({nullable: true})
  @ManyToOne(() => Meta, (meta) => meta.id)
  @JoinColumn()
  meta: number;

  @Column()
  tipo: string;
}