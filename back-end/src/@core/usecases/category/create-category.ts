import Category from "../../domain/category/entitie/category.entitie";
import { CategoryInput } from "../../domain/category/input/category.input";
import { ICategoryRepository } from "../../domain/category/interfaces/icategoryrepository";
export class CreateCategoryUseCase {

    constructor(
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async execute(input: CategoryInput) {

        const alreadyExists = await this.categoryRepository.IsNameAlreadyUse(input.name);

        if (alreadyExists) {
            throw new Error('Categoria já cadastrada');
        }

        const category = Category.newEntity(input);
        await this.categoryRepository.create(category);
        return category.toJSON();
    }
}