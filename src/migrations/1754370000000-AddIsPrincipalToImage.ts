import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsPrincipalToImage1754370000000 implements MigrationInterface {
  name = 'AddIsPrincipalToImage1754370000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" ADD "isPrincipal" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "isPrincipal"`);
  }
}
