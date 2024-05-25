import { MigrationInterface, QueryRunner } from "typeorm";

export class Popularbanco1716666170332 implements MigrationInterface {
    name = 'Popularbanco1716666170332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "conta" ("descricao", "data", "parcela", "valor", "icone") VALUES 
            ('Conta de Energia', '2024-01-01 00:00:00', 12, 1200, 'icone_energia.png'),
            ('Conta de Água', '2024-01-01 00:00:00', 6, 600, 'icone_agua.png');`
        );
        await queryRunner.query(`
            INSERT INTO "meta" ("descricao", "data_inicial", "data_final", "valor", "valor_mes", "icone", "ativo") VALUES 
            ('Economizar para Viagem', '2024-01-01 00:00:00', '2024-12-31 23:59:59', 12000, 1000, 'icone_viagem.png', true),
            ('Fundo de Emergência', '2024-01-01 00:00:00', '2024-06-30 23:59:59', 6000, 1000, 'icone_emergencia.png', true);`
        );
        await queryRunner.query(  `
            INSERT INTO "movimentacao" ("descricao", "data", "conta", "valor", "icone", "meta", "tipo", "contaId", "metaId") VALUES 
            ('Pagamento Energia Janeiro', '2024-01-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Fevereiro', '2024-02-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Março', '2024-03-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Abril', '2024-04-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Maio', '2024-05-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Junho', '2024-06-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Julho', '2024-07-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Agosto', '2024-08-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Setembro', '2024-09-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Outubro', '2024-10-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Novembro', '2024-11-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Energia Dezembro', '2024-12-05 00:00:00', 1, 100, 'icone_energia.png', NULL, 'despesa', 1, NULL),
            ('Pagamento Água Janeiro', '2024-01-10 00:00:00', 2, 100, 'icone_agua.png', NULL, 'despesa', 2, NULL),
            ('Pagamento Água Fevereiro', '2024-02-10 00:00:00', 2, 100, 'icone_agua.png', NULL, 'despesa', 2, NULL),
            ('Pagamento Água Março', '2024-03-10 00:00:00', 2, 100, 'icone_agua.png', NULL, 'despesa', 2, NULL),
            ('Pagamento Água Abril', '2024-04-10 00:00:00', 2, 100, 'icone_agua.png', NULL, 'despesa', 2, NULL),
            ('Pagamento Água Maio', '2024-05-10 00:00:00', 2, 100, 'icone_agua.png', NULL, 'despesa', 2, NULL),
            ('Pagamento Água Junho', '2024-06-10 00:00:00', 2, 100, 'icone_agua.png', NULL, 'despesa', 2, NULL),
            ('Economia Viagem Janeiro', '2024-01-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Fevereiro', '2024-02-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Março', '2024-03-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Abril', '2024-04-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Maio', '2024-05-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Junho', '2024-06-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Julho', '2024-07-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Agosto', '2024-08-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Setembro', '2024-09-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Outubro', '2024-10-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Novembro', '2024-11-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Economia Viagem Dezembro', '2024-12-15 00:00:00', NULL, 1000, 'icone_viagem.png', 1, 'meta', NULL, 1),
            ('Fundo Emergência Janeiro', '2024-01-20 00:00:00', NULL, 1000, 'icone_emergencia.png', 2, 'meta', NULL, 2),
            ('Fundo Emergência Fevereiro', '2024-02-20 00:00:00', NULL, 1000, 'icone_emergencia.png', 2, 'meta', NULL, 2),
            ('Fundo Emergência Março', '2024-03-20 00:00:00', NULL, 1000, 'icone_emergencia.png', 2, 'meta', NULL, 2),
            ('Fundo Emergência Abril', '2024-04-20 00:00:00', NULL, 1000, 'icone_emergencia.png', 2, 'meta', NULL, 2),
            ('Fundo Emergência Maio', '2024-05-20 00:00:00', NULL, 1000, 'icone_emergencia.png', 2, 'meta', NULL, 2),
            ('Fundo Emergência Junho', '2024-06-20 00:00:00', NULL, 1000, 'icone_emergencia.png', 2, 'meta', NULL, 2);`
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "movimentacao" WHERE "descricao" IN (
            'Pagamento Energia Janeiro', 'Pagamento Energia Fevereiro', 'Pagamento Energia Março', 'Pagamento Energia Abril',
            'Pagamento Energia Maio', 'Pagamento Energia Junho', 'Pagamento Energia Julho', 'Pagamento Energia Agosto',
            'Pagamento Energia Setembro', 'Pagamento Energia Outubro', 'Pagamento Energia Novembro', 'Pagamento Energia Dezembro',
            'Pagamento Água Janeiro', 'Pagamento Água Fevereiro', 'Pagamento Água Março', 'Pagamento Água Abril',
            'Pagamento Água Maio', 'Pagamento Água Junho', 'Economia Viagem Janeiro', 'Economia Viagem Fevereiro',
            'Economia Viagem Março', 'Economia Viagem Abril', 'Economia Viagem Maio', 'Economia Viagem Junho',
            'Economia Viagem Julho', 'Economia Viagem Agosto', 'Economia Viagem Setembro', 'Economia Viagem Outubro',
            'Economia Viagem Novembro', 'Economia Viagem Dezembro', 'Fundo Emergência Janeiro', 'Fundo Emergência Fevereiro',
            'Fundo Emergência Março', 'Fundo Emergência Abril', 'Fundo Emergência Maio', 'Fundo Emergência Junho'
            );
            
            DELETE FROM "meta" WHERE "descricao" IN ('Economizar para Viagem', 'Fundo de Emergência');
    
            DELETE FROM "conta" WHERE "descricao" IN ('Conta de Energia', 'Conta de Água');`
        );
    }

}
