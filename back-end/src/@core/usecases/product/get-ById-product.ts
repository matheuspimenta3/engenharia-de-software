import { IProductRepository } from "src/@core/domain/product/interface/iproductrepository";

export class GetProductByIdUseCase {

    constructor(
        private readonly productRepository: IProductRepository,
    ) { }

    async execute(
        id: string,
    ) {

        const product =await this.productRepository.GetById(id,);

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        return product.toJSON();
    }
}