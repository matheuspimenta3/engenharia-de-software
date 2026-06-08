import { UserInput } from "../input/user.input";


export default class UserValidator {

  errors: string[] = [];

  validate(
    data: UserInput,
  ): void {

    this.errors = [];

    if (!data.name?.trim()) {
      this.errors.push(
        'Nome é obrigatório',
      );
    }

    if (!data.email?.trim()) {
      this.errors.push(
        'Email é obrigatório',
      );
    }

    if (
      data.email &&
      !data.email.includes('@')
    ) {
      this.errors.push(
        'Email inválido',
      );
    }

    if (
      !data.password ||
      data.password.length < 6
    ) {
      this.errors.push(
        'Senha deve possuir ao menos 6 caracteres',
      );
    }
  }
}


export class UserValidatorFactory {

  static create() {
    return new UserValidator();
  }
}