import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';

import { CategoryDto } from './dtos/category.dto';
import { PaginationDto } from '../../@core/domain/basic/irepository';
import { CreateCategoryUseCase } from '../../@core/usecases/category/create-category';
import { GetCategoriesUseCase } from '../../@core/usecases/category/get catergories';
import { UpdateCategoryUseCase } from '../../@core/usecases/category/update-category';
import { DeactivateCategoryUseCase } from '../../@core/usecases/category/desactivate-category';
import { GetCategoryByIdUseCase } from '../../@core/usecases/category/get-ById-categories';

@Controller('categories')
export class CategoryController {

    constructor(
        @Inject('CreateCategoryUseCase')
        private readonly createCategoryUseCase: CreateCategoryUseCase,

        @Inject('GetCategoriesUseCase')
        private readonly getCategoriesUseCase: GetCategoriesUseCase,

        @Inject('GetCategoryByIdUseCase')
        private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,

        @Inject('UpdateCategoryUseCase')
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,

        @Inject('DeactivateCategoryUseCase')
        private readonly deactivateCategoryUseCase: DeactivateCategoryUseCase,
    ) { }

    @Post()
    async create(@Body() dto: CategoryDto) {
        return await this.createCategoryUseCase.execute(dto);
    }

    @Get()
    async getAll(@Query() query: PaginationDto) {
        return await this.getCategoriesUseCase.execute(query);
    }

    @Get(':id')
    async getById(@Param('id') id: string,
    ) {
        return await this.getCategoryByIdUseCase.execute(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: CategoryDto,
    ) {
        return await this.updateCategoryUseCase.execute( id, dto,);
    }

    @Patch(':id/deactivate')
    async deactivate(@Param('id') id: string ) {
        return await this.deactivateCategoryUseCase.execute(id);
    }
}