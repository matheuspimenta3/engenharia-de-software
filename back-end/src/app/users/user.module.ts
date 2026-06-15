import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserSchema } from '../../infra/repositories/users/user.schema'; // ajuste o caminho se necessário
import { UserTypeOrmRepository } from '../../infra/repositories/users/user.repository'; // ajuste: usa o nome exportado pelo arquivo de repositório
import { CreateUserUseCase } from '../../@core/usecases/users/create-user.use-case';
import { GetUsersUseCase } from '../../@core/usecases/users/get-users';
import { UpdateUserUseCase } from '../../@core/usecases/users/update-user';

@Module({
    imports: [
        // Garante que o TypeORM disponibilize o Schema/Entity do Usuário neste módulo
        TypeOrmModule.forFeature([UserSchema])
    ],
    controllers: [UserController],
    providers: [
        // 1. Fornece a instância do seu repositório de infraestrutura
        {
            provide: 'UserTypeOrmRepository',
            useClass: UserTypeOrmRepository, // usa o export do repositório
        },

        // 2. Fornece o UseCase construindo ele manualmente com a factory
        {
            provide: 'CreateUserUseCase',
            inject: ['UserTypeOrmRepository'], // Injeta o repositório configurado acima
            useFactory: (userRepo: UserTypeOrmRepository) => {
                return new CreateUserUseCase(userRepo); // Passa manualmente o repositório para o construtor!
            },
        },

        // Faça o mesmo para os outros usecases para evitar o mesmo erro neles:
        {
            provide: 'GetUsersUseCase',
            inject: ['UserTypeOrmRepository'],
            useFactory: (userRepo: UserTypeOrmRepository) => new GetUsersUseCase(userRepo),
        },
        {
            provide: 'UpdateUserUseCase',
            inject: ['UserTypeOrmRepository'],
            useFactory: (userRepo: UserTypeOrmRepository) => new UpdateUserUseCase(userRepo),
        },
    ],
})
export class UserIoCModule { }