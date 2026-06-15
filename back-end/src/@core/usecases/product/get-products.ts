import { PaginationDto } from '../../domain/basic/irepository';
import { IProductRepository } from '../../domain/product/interface/iproductrepository';

export class GetProductsUseCase {

    constructor(
        private readonly productRepository: IProductRepository,
    ) { }

    async execute( query: PaginationDto,) {

        const result = await this.productRepository.findPaginated( query,);

        return {
            total: result.total,
            data: result.data.map(product => product.toJSON()),
        };
    }
}