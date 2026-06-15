import { IStockMovementRepository } from 'src/@core/domain/stock-movement/interface/istockmovementpository';
import { PaginationDto } from '../../domain/basic/irepository';

export class GetStockMovementsUseCase {

    constructor(
        private readonly stockMovementRepository: IStockMovementRepository,
    ) { }

    async execute(query: PaginationDto, ) {

        const result = await this.stockMovementRepository.findPaginated( query,);

        return {
            total: result.total,
            data: result.data.map(movement => movement.toJSON(),),
        };
    }
}