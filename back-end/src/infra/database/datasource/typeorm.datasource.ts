import 'dotenv/config';
import { UserSchema } from '../../repositories/users/user.schema';
import { DataSource } from 'typeorm';
import { CategorySchema } from '../../repositories/category/category.schema';
import { ProductSchema } from '../../repositories/product/product.schema';
import { StockMovementSchema } from '../../repositories/stock_movement/stock_movement.schema';


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

  entities: [UserSchema, CategorySchema, ProductSchema, StockMovementSchema],

  migrations: [
    'src/infra/database/migrations/*.ts',
  ],

  synchronize: false,
});