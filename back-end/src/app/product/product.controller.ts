import { Body, Controller, Delete, Get, Param, Post, Put, Query, Inject, BadRequestException, ConflictException,} from '@nestjs/common';
import { CreateProductUseCase } from 'src/@core/usecases/product/create-product';
import { DeleteProductUseCase } from 'src/@core/usecases/product/delete-product';
import { GetProductByIdUseCase } from 'src/@core/usecases/product/get-ById-product';
import { GetProductsUseCase } from 'src/@core/usecases/product/get-products';
import { UpdateProductUseCase } from 'src/@core/usecases/product/update-product';
import { CreateProductDto } from './dtos/product.dto';



@Controller('products')
export class ProductController {

    constructor(
        @Inject('CreateProductUseCase')
        private readonly createProductUseCase: CreateProductUseCase,

        @Inject('UpdateProductUseCase')
        private readonly updateProductUseCase: UpdateProductUseCase,

        @Inject('DeleteProductUseCase')
        private readonly deleteProductUseCase: DeleteProductUseCase,

        @Inject('GetProductsUseCase')
        private readonly getProductsUseCase: GetProductsUseCase,

        @Inject('GetProductByIdUseCase')
        private readonly getProductByIdUseCase: GetProductByIdUseCase,
    ) { }

    @Post()
    async create(
        @Body() dto: CreateProductDto,
    ) {
        try {
            return await this.createProductUseCase.execute(
                dto,
            );
        } catch (error: any) {

            if (
                error.message.includes(
                    'já está sendo utilizado',
                )
            ) {
                throw new ConflictException(
                    error.message,
                );
            }

            throw new BadRequestException(
                error.message,
            );
        }
    }

    @Get()
    async getAll(
        @Query() query,
    ) {
        return await this.getProductsUseCase.execute(
            query,
        );
    }

    @Get(':id')
    async getById(
        @Param('id') id: string,
    ) {
        return await this.getProductByIdUseCase.execute(
            id,
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: CreateProductDto,
    ) {
        return await this.updateProductUseCase.execute(
            id,
            dto,
        );
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
    ) {
        return await this.deleteProductUseCase.execute(
            id,
        );
    }
}