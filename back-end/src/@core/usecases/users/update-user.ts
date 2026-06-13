import { IUserRepository } from "src/@core/domain/users/interfaces/iuserrepository";
import { CreateUserDto } from "src/app/users/dtos/create-user.dto";

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(input: CreateUserDto, id_user: string) {
        const user = await this.userRepository.GetById(id_user);

        if (!user) {
            throw new Error( 'Usuário não econtrado',);
        }

        const emailAlreadyExists = await this.userRepository.findByEmail( input.email,  id_user,);

        if (emailAlreadyExists) {
            throw new Error( 'Email já está sendo uado',);
        }

        user.name = input.name;
        user.email = input.email;
        user.role = input.role;
        user.active ?? true;

        if (input.password) {
            user.password = input.password;
            await user.encryptPassword();
        }

        const updatedUser =
            await this.userRepository.update(user,);

        return updatedUser.toJSON();
    }
}