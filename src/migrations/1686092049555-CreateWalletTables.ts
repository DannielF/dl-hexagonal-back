import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWalletTables1686092049555 implements MigrationInterface {
    name = 'CreateWalletTables1686092049555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_transaction_type_enum" AS ENUM('DEPOSIT', 'WITHDRAW')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("transaction_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "from" character varying NOT NULL, "to" character varying NOT NULL, "quantity" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT 'now()', "transaction_type" "public"."transactions_transaction_type_enum" NOT NULL, "client_id" uuid, CONSTRAINT "PK_9162bf9ab4e31961a8f7932974c" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("client_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_49e91f1e368e3f760789e7764aa" PRIMARY KEY ("client_id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_ebb352c973d8a85e8779a15ff35" FOREIGN KEY ("client_id") REFERENCES "clients"("client_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_ebb352c973d8a85e8779a15ff35"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_transaction_type_enum"`);
    }

}
