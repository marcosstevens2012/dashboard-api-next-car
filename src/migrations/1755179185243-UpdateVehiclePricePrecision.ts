import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVehiclePricePrecision1755179185243
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicles" ALTER COLUMN "precio" TYPE DECIMAL(12,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicles" ALTER COLUMN "precio" TYPE DECIMAL(10,2)`,
    );
  }
}
