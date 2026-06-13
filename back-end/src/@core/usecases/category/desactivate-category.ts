import { ICategoryRepository } from "src/@core/domain/category/interfaces/icategoryrepository";

export class DeactivateCategoryUseCase {

    constructor(
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async execute(id: string) {

        const category = await this.categoryRepository.GetById(id);

        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        category.active = false;

        await this.categoryRepository.update(category);
    }
}