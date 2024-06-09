import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContaDto, interfaceConta } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaEntity } from './entities/conta.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { MovimentacaoService } from 'src/movimentacao/movimentacao.service';
import { CreateMovimentacaoDto, TipoMovimentacao } from 'src/movimentacao/dto/create-movimentacao.dto';

@Injectable()
export class ContasService {
  constructor(
    @InjectRepository(ContaEntity)
    private contaRepository: Repository<ContaEntity>,
    private movimentacaoService: MovimentacaoService
  ) { }

  async findDesc(descricao: string): Promise<boolean> {
    return (await this.contaRepository.find({ where: { descricao: descricao } })).length > 0
  }

  async create(conta: CreateContaDto): Promise<{ message: string } | Error> {
    try {
      const dataAtual = new Date();
      dataAtual.setUTCHours(0,0,0,0);

      if (await this.findDesc(conta.descricao)) {
        throw new Error(`A conta com a decrição "${conta.descricao}" já existe`);
      }

      if (new Date(conta.data) < dataAtual) {
        throw new Error(`A data não pode ser menor que hoje!`);
      }

      if (conta.parcela < 2) {
        throw new Error(`A conta deve ter mais de uma parcela!`)
      }
      await this.contaRepository.save(conta);
      await this.adicionaListaGeral(conta);

      return { message: `Conta ${conta.descricao} gerado com sucesso` };

    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(params: interfaceConta): Promise<CreateContaDto[]> {
    try {
      const searchParams: FindOptionsWhere<ContaEntity> = {}

      if (params.descricao) {
        searchParams.descricao = ILike(`%${params.descricao}%`);
      }

      return await this.contaRepository.find({ where: searchParams });

    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<CreateContaDto | Error> {
    try {

      if (!await this.contaRepository.existsBy({ id })) {
        throw new Error(`A conta buscada não existe!`)
      }

      return await this.contaRepository.findOne({ where: { id } })

    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, conta: UpdateContaDto): Promise<{ message: string } | Error> {
    try {
      const found = await this.contaRepository.findOne({ where: { id } });

      if (!found) {
        throw new Error(`Conta não encontada!`);
      }
      this.updateConta(found)
      await this.contaRepository.update(id, conta);

      return { message: `Conta atualizada com sucesso!` }

    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number): Promise<{ message: string } | Error> {
    try {
      const conta = await this.contaRepository.findOne({ where: { id } })
      if (!conta) {
        throw new Error(`A conta com id "${id}" não foi encontrado!`)
      }
      await this.movimentacaoService.removeContaId(conta);
      await this.contaRepository.delete(id);

      return { message: `Conta removida com sucesso!` }
    } catch (error) {
      throw new HttpException(`Erro: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  async adicionaListaGeral(dado: CreateContaDto) {
    var movimentacao = new CreateMovimentacaoDto();
    movimentacao.descricao = dado.descricao;
    movimentacao.valor = parseFloat((dado.valor / dado.parcela).toFixed(2));
    movimentacao.icone = dado.icone;
    movimentacao.tipo = TipoMovimentacao.DESPESA;
    movimentacao.conta = this.contaRepository.create(dado);
    var data = new Date(dado.data);
  
    for (let index = 0; index < dado.parcela; index++) {
      if (index === 0) {
        movimentacao.data = dado.data;
      } else {
        movimentacao.data = new Date(data.setMonth(data.getMonth() + 1));
      }
      await this.movimentacaoService.create(movimentacao);
     
    }
  }

  async updateConta(dado: CreateContaDto) {
      await this.movimentacaoService.removeContaId(dado);
      this.adicionaListaGeral(dado)
  }
}
