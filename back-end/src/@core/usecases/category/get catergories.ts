import { ICategoryRepository } from 'src/@core/domain/category/interfaces/iuserrepository';
import { PaginationDto } from '../../domain/basic/irepository';

export class GetCategoriesUseCase {

    constructor(
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async execute(
        query: PaginationDto,
    ) {
        return await this.categoryRepository.findPaginated(
            query,
        );
    }
}