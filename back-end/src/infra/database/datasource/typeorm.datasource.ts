import 'dotenv/config';
import { UserSchema } from '../../repositories/users/user.schema';
import { DataSource } from 'typeorm';
import { CategorySchema } from 'src/infra/repositories/category/category.schema';


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

  entities: [UserSchema, CategorySchema],

  migrations: [
    'src/infra/database/migrations/*.ts',
  ],

  synchronize: false,
});