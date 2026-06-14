/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { GenericRepository } from '../abstractions/generic-repository';
import StockMovement from 'src/@core/domain/stock-movement/entitie/stock.movement.entitie';
import { StockMovementSchema } from './stock_movement.schema';
import { IStockMovementRepository } from 'src/@core/domain/stock-movement/interface/istockmovementpository';


@Injectable()
export class StockMovementTypeOrmRepository
 extends GenericRepository<
        StockMovement,
        StockMovementSchema
    >
    implements IStockMovementRepository {

    protected toDomain(
        schema: StockMovementSchema,
    ): StockMovement {

        return StockMovement.newEntity(
            {
                productId: schema.productId,
                user_id: schema.user_id,
                type: schema.type,
                quantity: schema.quantity,
                observation: schema.observation,
                createdAt: schema.createdAt,
            },
            schema.id,
        );
    }

    protected toPersistence(
        domain: StockMovement,
    ): DeepPartial<StockMovementSchema> {

        return {
            id: domain.id,
            productId: domain.productId,
            user_id: domain.user_id,
            type: domain.type,
            quantity: domain.quantity,
            observation: domain.observation,
            createdAt: domain.createdAt,
        };
    }
}