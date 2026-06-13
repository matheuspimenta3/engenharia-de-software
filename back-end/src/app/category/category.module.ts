import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySchema } from 'src/infra/repositories/category/category.schema';
import { CategoryController } from './category.contoller';
import { CategoryTypeOrmRepository } from 'src/infra/repositories/category/category.repository';
import { CreateCategoryUseCase } from 'src/@core/usecases/category/create-category';
import { GetCategoriesUseCase } from 'src/@core/usecases/category/get catergories';
import { UpdateCategoryUseCase } from 'src/@core/usecases/category/update-category';
import { DeactivateCategoryUseCase } from 'src/@core/usecases/category/desactivate-category';
import { GetCategoryByIdUseCase } from 'src/@core/usecases/category/get-ById-categories';




@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategorySchema,
        ]),
    ],

    controllers: [
        CategoryController,
    ],

    providers: [
        {
            provide: 'ICategoryRepository',
            useClass: CategoryTypeOrmRepository,
        },

        {
            provide: 'CreateCategoryUseCase',
            inject: ['ICategoryRepository'],
            useFactory: (repository) =>
                new CreateCategoryUseCase(
                    repository,
                ),
        },

        {
            provide: 'GetCategoriesUseCase',
            inject: ['ICategoryRepository'],
            useFactory: (repository) =>
                new GetCategoriesUseCase(
                    repository,
                ),
        },

        {
            provide: 'GetCategoryByIdUseCase',
            inject: ['ICategoryRepository'],
            useFactory: (repository) =>
                new GetCategoryByIdUseCase(
                    repository,
                ),
        },

        {
            provide: 'UpdateCategoryUseCase',
            inject: ['ICategoryRepository'],
            useFactory: (repository) =>
                new UpdateCategoryUseCase(
                    repository,
                ),
        },

        {
            provide: 'DeactivateCategoryUseCase',
            inject: ['ICategoryRepository'],
            useFactory: (repository) =>
                new DeactivateCategoryUseCase(
                    repository,
                ),
        },
    ],

    exports: [
        'ICategoryRepository',
        'CreateCategoryUseCase',
        'GetCategoriesUseCase',
        'GetCategoryByIdUseCase',
        'UpdateCategoryUseCase',
        'DeactivateCategoryUseCase',
    ],
})
export class CategoryIoCModule { }