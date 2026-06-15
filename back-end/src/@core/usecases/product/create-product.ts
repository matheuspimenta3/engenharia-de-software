import Product from '../../domain/product/entitie/product.entitie';
import { ProductInput } from '../../domain/product/input/product.input';
import { IProductRepository } from '../../domain/product/interface/iproductrepository';

export class CreateProductUseCase {

    constructor(
        private readonly productRepository: IProductRepository,
    ) { }

    async execute(input: ProductInput,) {

        const alreadyExists =
            await this.productRepository.IsNameAlreadyUse( input.name, );

        if (alreadyExists) {
            throw new Error( 'Produto já cadastrado', );
        }

        const product = Product.newEntity(input);

        const createdProduct = await this.productRepository.create( product, );

        return createdProduct.toJSON();
    }
}