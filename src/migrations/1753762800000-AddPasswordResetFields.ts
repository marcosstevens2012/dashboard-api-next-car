import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordResetFields1753762800000 implements MigrationInterface {
  name = 'AddPasswordResetFields1753762800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'resetPasswordToken',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'resetPasswordExpires',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'resetPasswordToken');
    await queryRunner.dropColumn('users', 'resetPasswordExpires');
  }
}
