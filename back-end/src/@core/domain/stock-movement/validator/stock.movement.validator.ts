import { StockMovementType } from "../enums/type.movement";
import { StockMovementInput } from "../input/stock.movement.input";


export default class StockMovementValidator {

    errors: string[] = [];

    validate(
        data: StockMovementInput,
    ): void {

        this.errors = [];

        if (!data.productId?.trim()) {
            this.errors.push(
                'Produto é obrigatório',
            );
        }

        if (!data.createdBy?.trim()) {
            this.errors.push(
                'Usuário responsável é obrigatório',
            );
        }

        if (!data.type) {
            this.errors.push(
                'Tipo da movimentação é obrigatório',
            );
        }

        if (
            data.type &&
            !Object.values(StockMovementType).includes(data.type)
        ) {
            this.errors.push(
                'Tipo da movimentação inválido',
            );
        }

        if (
            data.quantity === undefined ||
            data.quantity === null
        ) {
            this.errors.push(
                'Quantidade é obrigatória',
            );
        }

        if (
            data.quantity !== undefined &&
            data.quantity <= 0
        ) {
            this.errors.push(
                'Quantidade deve ser maior que zero',
            );
        }
    }
}

export class StockMovementValidatorFactory {

    static create() {
        return new StockMovementValidator();
    }
}