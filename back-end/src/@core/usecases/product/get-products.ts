import { PaginationDto } from 'src/@core/domain/basic/irepository';
import { IProductRepository } from 'src/@core/domain/product/interface/iproductrepository';

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