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
            throw new Error('Email ja cadastrado');

        }
        
        input.active = true // ja é criado por padrão ativo.        
        const newUser = User.newEntity(input);
        await newUser.encryptPassword();
        const savedUser = await this.userRepository.create(newUser);

        return savedUser.toJSON();
    }
}