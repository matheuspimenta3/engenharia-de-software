import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserSchema } from 'src/infra/repositories/users/user.schema';
import { UserTypeOrmRepository } from 'src/infra/repositories/users/user.repository';
import { CreateUserUseCase } from 'src/@core/usecases/users/create-user.use-case';
import { GetUsersUseCase } from 'src/@core/usecases/users/get-users';
import { UpdateUserUseCase } from 'src/@core/usecases/users/update-user';

@Module({
    imports: [TypeOrmModule.forFeature([UserSchema]),],
    controllers: [UserController,],
    providers: [
        {
            provide: 'IUserRepository',
            useClass: UserTypeOrmRepository,
        },

        {
            provide: 'CreateUserUseCase',
            inject: ['IUserRepository'],
            useFactory: (userRepository: UserTypeOrmRepository) => {
                return new CreateUserUseCase(userRepository);
            },
        },
        {
            provide: 'GetUsersUseCase',
            inject: ['IUserRepository'],
            useFactory: (
                userRepository: UserTypeOrmRepository,
            ) => {
                return new GetUsersUseCase(
                    userRepository,
                );
            },
        },
        {
            provide: 'UpdateUserUseCase',
            inject: ['IUserRepository'],
            useFactory: (
                userRepository: UserTypeOrmRepository,
            ) => {
                return new UpdateUserUseCase(
                    userRepository,
                );
            },
        },


    ],
    exports: ['IUserRepository', 'CreateUserUseCase', 'GetUsersUseCase', 'UpdateUserUseCase' ],
})
export class UserIoCModule { }