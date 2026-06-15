import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from '../infra/repositories/users/user.schema';
import { UserIoCModule } from '../app/users/user.module';
import { CategoryIoCModule } from '../app/category/category.module';
import { ProductIoCModule } from '../app/product/product.module';
import { ProductSchema } from '../infra/repositories/product/product.schema';
import { CategorySchema } from '../infra/repositories/category/category.schema';
import { StockMovementIoCModule } from '../app/stock_movement/stock_movement.module';
import { StockMovementSchema } from '../infra/repositories/stock_movement/stock_movement.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserSchema, CategorySchema,ProductSchema, StockMovementSchema,],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false, // Necessário para conectar ao Render localmente
        },
      }),
    }),

    UserIoCModule,
    CategoryIoCModule,
    ProductIoCModule,
    StockMovementIoCModule,
  ],
})
export class AppModule { }