import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1686060501956 implements MigrationInterface {
  name = 'Migrations1686060501956';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" ("transaction_id" uuid NOT NULL DEFAULT 82750593-7299-4dda-9d53-5a7fb8bf459d, "from" character varying NOT NULL, "to" character varying NOT NULL, "quantity" integer NOT NULL, "date" TIMESTAMP NOT NULL, "client_id" uuid, CONSTRAINT "PK_9162bf9ab4e31961a8f7932974c" PRIMARY KEY ("transaction_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("client_id" uuid NOT NULL DEFAULT 008e4c4a-9ba9-4188-b3e3-40ec9c2dac89, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_49e91f1e368e3f760789e7764aa" PRIMARY KEY ("client_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_ebb352c973d8a85e8779a15ff35" FOREIGN KEY ("client_id") REFERENCES "clients"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_ebb352c973d8a85e8779a15ff35"`,
    );
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
