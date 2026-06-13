import { ProductInput } from '../input/product.input';

export default class ProductValidator {

    errors: string[] = [];

    validate(
        data: ProductInput,
    ): void {

        this.errors = [];

        if (!data.name?.trim()) {
            this.errors.push(
                'Nome é obrigatório',
            );
        }

        if (!data.categoryId?.trim()) {
            this.errors.push(
                'Categoria é obrigatória',
            );
        }

        if (data.price <= 0) {
            this.errors.push(
                'Preço de venda deve ser maior que zero',
            );
        }

        if (data.costPrice < 0) {
            this.errors.push(
                'Preço de custo inválido',
            );
        }

        if (data.costPrice > data.price) {
            this.errors.push(
                'Preço de custo não pode ser maior que o preço de venda',
            );
        }
    }
}

export class ProductValidatorFactory {

    static create() {
        return new ProductValidator();
    }
}