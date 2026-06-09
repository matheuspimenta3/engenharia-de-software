/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../infra/database/typeorm/schemas/user.schema';
import { UserTypeOrmRepository } from '../infra/repositories/user.repository';
import { UserController } from '../app/user.controller';
import { CreateUserUseCase } from '../@core/usecases/users/create-user.use-case';

@Module({
    imports: [
        // Registra o Schema no TypeORM para disponibilizar o repositório nativo do banco
        TypeOrmModule.forFeature([UserSchema]),
    ],
    controllers: [
        // Declara o controller da camada App
        UserController,
    ],
    providers: [
        // 1. Amarração do Repositório: Quando alguém pedir a string 'IUserRepository', o NestJS entrega a instância do TypeORM
        {
            provide: 'IUserRepository',
            useClass: UserTypeOrmRepository,
        },

        // 2. Amarração do Caso de Uso: Como ele não tem @Injectable(), nós usamos uma Factory para instanciá-lo manualmente
        {
            provide: 'CreateUserUseCase',
            inject: ['IUserRepository'], // Injeta o repositório amarrado acima no construtor do caso de uso
            useFactory: (userRepository: UserTypeOrmRepository) => {
                return new CreateUserUseCase(userRepository);
            },
        },
    ],
    // Exportamos os tokens caso outros módulos (como o de autenticação futuramente) precisem usá-los
    exports: ['IUserRepository', 'CreateUserUseCase'],
})
export class UserIoCModule { }