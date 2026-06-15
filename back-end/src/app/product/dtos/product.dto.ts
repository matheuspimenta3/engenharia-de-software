import {
    IsBoolean,
    IsNumber,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateProductDto {

    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsUUID()
    categoryId!: string;

    @IsNumber()
    price!: number;

    @IsNumber()
    costPrice!: number;

    @IsNumber()
    quantity!: number;

    @IsNumber()
    minimumQuantity!: number;

    @IsBoolean()
    active!: boolean;
}