import { StockMovementType } from "../enums/type.movement";


export type StockMovementInput = {
    productId: string;
    quantity: number;
    type: StockMovementType;
    observation?: string;
    user_id: string;

    createdAt?: Date;
};