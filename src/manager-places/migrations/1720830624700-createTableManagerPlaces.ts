import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlaces1720830624700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE places (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        city VARCHAR NOT NULL,
        state VARCHAR NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."updatedAt" = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER update_places_updated_at
      BEFORE UPDATE ON places
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS update_places_updated_at ON places;
    `);

    await queryRunner.query(`
      DROP FUNCTION IF EXISTS update_updated_at_column();
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS places;
    `);
  }
}
