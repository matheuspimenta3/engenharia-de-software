/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { CategorySchema } from '../category/category.schema';

@Entity({ name: 'products' })
export class ProductSchema {

    @PrimaryColumn({ type: 'uuid' })
    id!: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name!: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description!: string;

    @Column({
        name: 'category_id',
        type: 'uuid',
    })
    categoryId!: string;

    @ManyToOne(
        () => CategorySchema,
        { nullable: false },
    )
    @JoinColumn({
        name: 'category_id',
    })
    category!: CategorySchema;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price!: number;

    @Column({
        name: 'cost_price',
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    costPrice!: number;

    @Column({
        type: 'integer',
        default: 0,
    })
    quantity!: number;

    @Column({
        name: 'minimum_quantity',
        type: 'integer',
        default: 0,
    })
    minimumQuantity!: number;

    @Column({
        type: 'boolean',
        default: true,
    })
    active!: boolean;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt!: Date;
}