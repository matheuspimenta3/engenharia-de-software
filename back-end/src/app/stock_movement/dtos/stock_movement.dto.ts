import { IsEnum, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { StockMovementType } from '../../../@core/domain/stock-movement/enums/type.movement';

export class StockMovementDto {

    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsString()
    @IsNotEmpty()
    user_id!: string;

    @IsEnum(StockMovementType)
    type!: StockMovementType;

    @Min(1)
    quantity!: number;

    @IsOptional()
    @IsString()
    observation?: string;
}