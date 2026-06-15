import { ProductInput } from '../../domain/product/input/product.input';
import { IProductRepository } from '../../domain/product/interface/iproductrepository';

export class UpdateProductUseCase {

    constructor(
        private readonly productRepository: IProductRepository,
    ) { }

    async execute(id: string, input: ProductInput,) {
        
        
        const product = await this.productRepository.GetById(id,);

        if (!product) {
            throw new Error('Produto não encontrado',);
        }

        const alreadyExists = await this.productRepository.IsNameAlreadyUse( input.name, id,);

        if (alreadyExists) {
            throw new Error( 'Nome do produto já está sendo utilizado',);
        }

        product.name = input.name;
        product.description = input.description;
        product.price = input.price;
        product.costPrice = input.costPrice;
        product.quantity = input.quantity;
        product.minimumQuantity = input.minimumQuantity;
        product.active = input.active;

        const updatedProduct = await this.productRepository.update(product,);

        return updatedProduct.toJSON();
    }
}