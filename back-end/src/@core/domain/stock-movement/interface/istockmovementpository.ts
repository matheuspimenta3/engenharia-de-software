import { IRepositoryGeneric } from "../../basic/irepository";
import StockMovement from "../entitie/stock.movement.entitie";

export interface IStockMovementRepository
    extends IRepositoryGeneric<StockMovement> {
}