import { UserInput } from "src/@core/domain/users/input/user.input";
import { IUserRepository } from "src/@core/domain/users/interfaces/iuserrepository";
import { CreateUserDto } from "src/app/users/dtos/create-user.dto";

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(input: CreateUserDto, id_user: string) {
        const user = await this.userRepository.GetById(id_user);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const emailExists = await this.userRepository.findByEmail(input.email, id_user);
        if (emailExists) {
            throw new Error('Email ja cadastrado');

        }


        return this.userRepository.update(
            user,
        );
    }
}