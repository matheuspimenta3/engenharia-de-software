import Category from "src/@core/domain/category/entitie/category.entitie";
import { CategoryInput } from "src/@core/domain/category/input/category.input";
import { ICategoryRepository } from "src/@core/domain/category/interfaces/iuserrepository";

export class UpdateCategoryUseCase {

    constructor(
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async execute( id: string, input: CategoryInput) {

        const category = await this.categoryRepository.GetById(id);

        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        const alreadyExists = await this.categoryRepository.IsNameAlreadyUse( input.name, id, );

        if (alreadyExists) {
            throw new Error('Nome da categoria já está sendo utilizado',);
        }

        return await this.categoryRepository.update(
            Category.newEntity(
                category.toUpdate(),
                category.id,
            ),
        );
    }
}