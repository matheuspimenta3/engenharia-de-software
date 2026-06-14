/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { ProductSchema } from '../product/product.schema';
import { UserSchema } from '../users/user.schema';
import { StockMovementType } from 'src/@core/domain/stock-movement/enums/type.movement';


@Entity({ name: 'stock_movements' })
export class StockMovementSchema {

    @PrimaryColumn({ type: 'uuid' })
    id!: string;

    @Column({
        name: 'product_id',
        type: 'uuid',
    })
    productId!: string;

    @ManyToOne(
        () => ProductSchema,
        { nullable: false },
    )
    @JoinColumn({
        name: 'product_id',
    })
    product!: ProductSchema;

    @Column({
        name: 'user_id',
        type: 'uuid',
    })
    user_id!: string;

    @ManyToOne(
        () => UserSchema,
        { nullable: false },
    )
    @JoinColumn({
        name: 'user_id',
    })
    users!: UserSchema;

    @Column({
        type: 'enum',
        enum: StockMovementType,
    })
    type!: StockMovementType;

    @Column({
        type: 'integer',
    })
    quantity!: number;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
    })
    observation?: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt!: Date;
}