import Product from '../../domain/product/entitie/product.entitie';
import { IProductRepository } from '../../domain/product/interface/iproductrepository';
import StockMovement from '../../domain/stock-movement/entitie/stock.movement.entitie';
import { StockMovementInput } from '../../domain/stock-movement/input/stock.movement.input';
import { IStockMovementRepository } from '../../domain/stock-movement/interface/istockmovementpository';


export class CreateExitMovementUseCase {

    constructor(
        private readonly stockMovementRepository: IStockMovementRepository,
        private readonly productRepository: IProductRepository,
    ) { }

    async execute(input: StockMovementInput) {

        const product = await this.productRepository.GetById(input.productId,);

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        if ( product.quantity < input.quantity) {
            throw new Error('Estoque insuficiente',);
        }

        product.quantity = product.quantity - input.quantity;

        await this.productRepository.update(
            Product.newEntity(
                product.toUpdate(),
                product.id,
            ),
        );

        const movement = StockMovement.newEntity({...input,});

        const created = await this.stockMovementRepository.create(movement,);

        return created.toJSON();
    }
}