import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from '../../infra/repositories/product/product.schema';
import { StockMovementSchema } from '../../infra/repositories/stock_movement/stock_movement.schema';
import { StockMovementController } from './stock_movement.controller';
import { StockMovementTypeOrmRepository } from '../../infra/repositories/stock_movement/stock_movement.repository';
import { ProductTypeOrmRepository } from '../../infra/repositories/product/repository.product';
import { GetStockMovementsUseCase } from '../../@core/usecases/stock_movement/get-stock-movements';
import { GetStockMovementByIdUseCase } from '../../@core/usecases/stock_movement/get-ById-stock-movement';
import { CreateEntryMovementUseCase } from '../../@core/usecases/stock_movement/create-entry-stock-movement';
import { CreateExitMovementUseCase } from '../../@core/usecases/stock_movement/create-exit-stock-movement';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            StockMovementSchema,
            ProductSchema,
        ]),
    ],

    controllers: [
        StockMovementController,
    ],

    providers: [

        {
            provide: 'IStockMovementRepository',
            useClass: StockMovementTypeOrmRepository,
        },

        {
            provide: 'IProductRepository',
            useClass: ProductTypeOrmRepository,
        },

        {
            provide: 'CreateEntryMovementUseCase',
            inject: [
                'IStockMovementRepository',
                'IProductRepository',
            ],
            useFactory: (
                stockMovementRepository,
                productRepository,
            ) => {

                return new CreateEntryMovementUseCase(
                    stockMovementRepository,
                    productRepository,
                );
            },
        },

        {
            provide: 'CreateExitMovementUseCase',
            inject: [
                'IStockMovementRepository',
                'IProductRepository',
            ],
            useFactory: (
                stockMovementRepository,
                productRepository,
            ) => {

                return new CreateExitMovementUseCase(
                    stockMovementRepository,
                    productRepository,
                );
            },
        },

        {
            provide: 'GetStockMovementsUseCase',
            inject: [
                'IStockMovementRepository',
            ],
            useFactory: (
                stockMovementRepository,
            ) => {

                return new GetStockMovementsUseCase(
                    stockMovementRepository,
                );
            },
        },

        {
            provide: 'GetStockMovementByIdUseCase',
            inject: [
                'IStockMovementRepository',
            ],
            useFactory: (
                stockMovementRepository,
            ) => {

                return new GetStockMovementByIdUseCase(
                    stockMovementRepository,
                );
            },
        },
    ],

    exports: [
        'IStockMovementRepository',

        'CreateEntryMovementUseCase',
        'CreateExitMovementUseCase',

        'GetStockMovementsUseCase',
        'GetStockMovementByIdUseCase',
    ],
})
export class StockMovementIoCModule { }