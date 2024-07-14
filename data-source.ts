import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/manager-places/migrations/*{.ts,.js}'],
  synchronize: false,
});
