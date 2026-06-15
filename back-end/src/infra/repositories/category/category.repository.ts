/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial, Not } from 'typeorm';
import { GenericRepository } from '../abstractions/generic-repository';
import { CategorySchema } from './category.schema';
import Category from '../../../@core/domain/category/entitie/category.entitie';
import { InjectRepository as TypeOrmInjectRepository } from '@nestjs/typeorm';
import { ICategoryRepository } from '../../../@core/domain/category/interfaces/icategoryrepository';

@Injectable()
export class CategoryTypeOrmRepository
    extends GenericRepository<Category, CategorySchema>
    implements ICategoryRepository {
    constructor(
        @TypeOrmInjectRepository(CategorySchema)
        repository: Repository<CategorySchema>
    ) {
        super(repository);
    }

    protected toDomain(schema: CategorySchema): Category {

        return Category.newEntity(
            {
                name: schema.name,
                active: schema.active,
                createdAt: schema.createdAt,
                updatedAt: schema.updatedAt,
            },
            schema.id,
        );
    }

    protected toPersistence(domain: Category): DeepPartial<CategorySchema> {

        return {
            id: domain.id,
            name: domain.name,
            active: domain.active,
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt,
        };
    }

    async IsNameAlreadyUse(name: string, id?: string,): Promise<boolean> {

        const category = await this.repository.findOne({
            where: {
                name,
                ...(id && {
                    id: Not(id),
                }),
            },
        });

        return !!category;
    }
}