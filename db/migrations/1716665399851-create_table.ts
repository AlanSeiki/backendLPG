import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1716665399851 implements MigrationInterface {
    name = 'CreateTable1716665399851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "conta" (
                "id" SERIAL NOT NULL PRIMARY KEY, 
                "descricao" character varying NOT NULL, 
                "data" TIMESTAMP NOT NULL, 
                "parcela" integer NOT NULL, 
                "valor" float NOT NULL, 
                "icone" character varying NOT NULL)`
        );
        await queryRunner.query(`
            CREATE TABLE "meta" (
                "id" SERIAL NOT NULL PRIMARY KEY, 
                "descricao" character varying NOT NULL, 
                "data_inicial" TIMESTAMP NOT NULL,
                "data_final" TIMESTAMP NOT NULL,
                "valor" float NOT NULL, 
                "valor_mes" float NOT NULL, 
                "icone" character varying NOT NULL, 
                "ativo" boolean NOT NULL DEFAULT true)`
        );
        await queryRunner.query(`
            CREATE TABLE "movimentacao" (
                "id" SERIAL NOT NULL PRIMARY KEY, 
                "descricao" character varying NOT NULL, 
                "data" TIMESTAMP NOT NULL, 
                "conta" integer, 
                "valor" float NOT NULL, 
                "icone" character varying NOT NULL, 
                "meta" integer, 
                "tipo" character varying NOT NULL, 
                "contaId" integer, 
                "metaId" integer)`
        );
        await queryRunner.query(`
            ALTER TABLE "movimentacao" ADD CONSTRAINT "FK_movimentacao_conta" FOREIGN KEY ("contaId") REFERENCES "conta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(`
            ALTER TABLE "movimentacao" ADD CONSTRAINT "FK_movimentacao_meta" FOREIGN KEY ("metaId") REFERENCES "meta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movimentacao" DROP CONSTRAINT "FK_movimentacao_conta"`);
        await queryRunner.query(`ALTER TABLE "movimentacao" DROP CONSTRAINT "FK_movimentacao_meta"`);
        await queryRunner.query(`DROP TABLE "movimentacao"`);
        await queryRunner.query(`DROP TABLE "meta"`);
        await queryRunner.query(`DROP TABLE "conta"`);
    }

}
