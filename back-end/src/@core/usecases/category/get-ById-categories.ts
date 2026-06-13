import { ICategoryRepository } from "src/@core/domain/category/interfaces/iuserrepository";

export class GetCategoryByIdUseCase {

    constructor(
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async execute(id: string) {

        const category = await this.categoryRepository.GetById(id);

        if (!category) {
            throw new Error('Categoria não encontrada');
        }
        return category;
    }
}