/* eslint-disable prettier/prettier */
import { IUserRepository } from '../../domain/users/interfaces/iuserrepository';
import { UserInput } from '../../domain/users/input/user.input';
import User from '../../domain/users/entitie/user.entitiy';

export class CreateUserUseCase {
    // Recebe a interface do repositório via construtor (Inversão de Dependência)
    constructor(
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(input: UserInput): Promise<any> {
        // 1. Regra de Negócio: Validar se o e-mail já está em uso
        const emailExists = await this.userRepository.findByEmail(input.email);

        if (emailExists) {
            // Lançamos um erro puro do domínio. O Controller se encarregará de transformá-lo em HTTP 400/409
            throw new Error('Este e-mail já está sendo utilizado por outro usuário.');
        }

        // 2. Criação da Entidade de Domínio (onde roda o UserValidator internamente)
        // Nota: Em um cenário real de produção, a senha (input.password) deveria ser criptografada aqui antes de criar a entidade (ex: usando bcrypt)
        const newUser = User.newEntity({
            name: input.name,
            email: input.email,
            password: input.password,
            role: input.role,
            active: input.active ?? true,
        });

        // 3. Persistência através do repositório
        const savedUser = await this.userRepository.create(newUser);

        // 4. Retorna a resposta limpa mapeada pelo método do domínio (sem expor a senha)
        return savedUser.toJSON();
    }
}