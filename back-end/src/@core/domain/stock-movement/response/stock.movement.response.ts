import { StockMovementType } from "../enums/type.movement";

export type StockMovementResponse = {
    id: string;
    productId: string;
    quantity: number;
    type: StockMovementType;
    observation?: string;
    user_id: string;
    createdAt?: Date;
};