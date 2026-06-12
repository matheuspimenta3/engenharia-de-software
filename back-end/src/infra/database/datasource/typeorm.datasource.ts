import 'dotenv/config';
import { UserSchema } from '../../repositories/users/user.schema';
import { DataSource } from 'typeorm';

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  ssl: {
    rejectUnauthorized: false,
  },

  entities: [UserSchema],

  migrations: [
    'src/infra/database/migrations/*.ts',
  ],

  synchronize: false,
});