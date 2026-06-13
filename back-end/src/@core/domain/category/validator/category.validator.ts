import { CategoryInput } from '../input/category.input';

export default class CategoryValidator {

  errors: string[] = [];

  validate(
    data: CategoryInput,
  ): void {

    this.errors = [];

    if (!data.name?.trim()) {
      this.errors.push(
        'Nome da categoria é obrigatório',
      );
    }
  }
}


export class CategoryValidatorFactory {

  static create() {
    return new CategoryValidator();
  }
}