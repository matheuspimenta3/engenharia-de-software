/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DeepPartial, Not } from 'typeorm';

import Product from 'src/@core/domain/product/entitie/product.entitie';

import { GenericRepository } from '../abstractions/generic-repository';
import { ProductSchema } from './product.schema';
import { IProductRepository } from 'src/@core/domain/product/interface/iproductrepository';

@Injectable()
export class ProductTypeOrmRepository
    extends GenericRepository<Product, ProductSchema>
    implements IProductRepository {

    protected toDomain(
        schema: ProductSchema,
    ): Product {

        return Product.newEntity(
            {
                name: schema.name,
                description: schema.description,
                categoryId: schema.categoryId,
                price: Number(schema.price),
                costPrice: Number(schema.costPrice),
                quantity: schema.quantity,
                minimumQuantity: schema.minimumQuantity,
                active: schema.active,
                createdAt: schema.createdAt,
                updatedAt: schema.updatedAt,
            },
            schema.id,
        );
    }

    protected toPersistence(
        domain: Product,
    ): DeepPartial<ProductSchema> {

        return {
            id: domain.id,
            name: domain.name,
            description: domain.description,
            categoryId: domain.categoryId,
            price: domain.price,
            costPrice: domain.costPrice,
            quantity: domain.quantity,
            minimumQuantity: domain.minimumQuantity,
            active: domain.active,
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt,
        };
    }

    async IsNameAlreadyUse(
        name: string,
        id_product?: string,
    ): Promise<boolean> {

        const product =
            await this.repository.findOne({
                where: {
                    name,
                    ...(id_product && {
                        id: Not(id_product),
                    }),
                },
            });

        return !!product;
    }
}