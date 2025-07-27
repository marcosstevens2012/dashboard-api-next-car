import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTipoToVehicle1753750042000 implements MigrationInterface {
  name = 'AddTipoToVehicle1753750042000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicles" ADD "tipo" character varying NOT NULL DEFAULT 'auto'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "tipo"`);
  }
}
