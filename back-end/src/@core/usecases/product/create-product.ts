import Product from 'src/@core/domain/product/entitie/product.entitie';
import { ProductInput } from 'src/@core/domain/product/input/product.input';
import { IProductRepository } from 'src/@core/domain/product/interface/iproductrepository';

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