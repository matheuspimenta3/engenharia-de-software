import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductSchema } from 'src/infra/repositories/product/product.schema';

import { ProductController } from './product.controller';
import { ProductTypeOrmRepository } from 'src/infra/repositories/product/repository.product';
import { CreateProductUseCase } from 'src/@core/usecases/product/create-product';
import { UpdateProductUseCase } from 'src/@core/usecases/product/update-product';
import { DeleteProductUseCase } from 'src/@core/usecases/product/delete-product';
import { GetProductsUseCase } from 'src/@core/usecases/product/get-products';
import { GetProductByIdUseCase } from 'src/@core/usecases/product/get-ById-product';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductSchema,
        ]),
    ],

    controllers: [
        ProductController,
    ],

    providers: [
        {
            provide: 'IProductRepository',
            useClass: ProductTypeOrmRepository,
        },

        {
            provide: 'CreateProductUseCase',
            inject: ['IProductRepository'],
            useFactory: (repository) =>
                new CreateProductUseCase(
                    repository,
                ),
        },

        {
            provide: 'UpdateProductUseCase',
            inject: ['IProductRepository'],
            useFactory: (repository) =>
                new UpdateProductUseCase(
                    repository,
                ),
        },

        {
            provide: 'DeleteProductUseCase',
            inject: ['IProductRepository'],
            useFactory: (repository) =>
                new DeleteProductUseCase(
                    repository,
                ),
        },

        {
            provide: 'GetProductsUseCase',
            inject: ['IProductRepository'],
            useFactory: (repository) =>
                new GetProductsUseCase(
                    repository,
                ),
        },

        {
            provide: 'GetProductByIdUseCase',
            inject: ['IProductRepository'],
            useFactory: (repository) =>
                new GetProductByIdUseCase(
                    repository,
                ),
        },
    ],

    exports: [
        'IProductRepository',
        'CreateProductUseCase',
        'UpdateProductUseCase',
        'DeleteProductUseCase',
        'GetProductsUseCase',
        'GetProductByIdUseCase',
    ],
})
export class ProductIoCModule { }