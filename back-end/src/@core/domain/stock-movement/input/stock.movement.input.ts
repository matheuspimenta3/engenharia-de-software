import { StockMovementType } from "../enums/type.movement";


export type StockMovementInput = {
    productId: string;
    quantity: number;
    type: StockMovementType;
    observation?: string;
    createdBy: string;

    createdAt?: Date;
};