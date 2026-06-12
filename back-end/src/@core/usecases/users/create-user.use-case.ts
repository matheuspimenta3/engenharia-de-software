/* eslint-disable prettier/prettier */
import { IUserRepository } from '../../domain/users/interfaces/iuserrepository';
import { UserInput } from '../../domain/users/input/user.input';
import User from '../../domain/users/entitie/user.entitiy';

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(input: UserInput): Promise<any> {
        const emailExists = await this.userRepository.findByEmail(input.email);

        if (emailExists) {
        }

        const newUser = User.newEntity({
            name: input.name,
            email: input.email,
            password: input.password,
            role: input.role,
            active: input.active ?? true,
        });

        const savedUser = await this.userRepository.create(newUser);

        return savedUser.toJSON();
    }
}