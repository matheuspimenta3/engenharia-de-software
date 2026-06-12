import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserSchema } from 'src/infra/repositories/users/user.schema';
import { UserTypeOrmRepository } from 'src/infra/repositories/users/user.repository';
import { CreateUserUseCase } from 'src/@core/usecases/users/create-user.use-case';

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
    ],
    exports: ['IUserRepository', 'CreateUserUseCase'],
})
export class UserIoCModule { }