import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderToImage1755179200000 implements MigrationInterface {
  name = 'AddOrderToImage1755179200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" ADD "sortOrder" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "sortOrder"`);
  }
}
