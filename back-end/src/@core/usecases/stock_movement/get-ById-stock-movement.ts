import { IStockMovementRepository } from "src/@core/domain/stock-movement/interface/istockmovementpository";

export class GetStockMovementByIdUseCase {

    constructor(
        private readonly stockMovementRepository: IStockMovementRepository,
    ) { }

    async execute( id: string,) {

        const movement = await this.stockMovementRepository.GetById(id,);   
        if (!movement) {
            throw new Error('Movimentação não encontrada', );
        }

        return movement.toJSON();
    }
}