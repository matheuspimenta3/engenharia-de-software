import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../infra/database/typeorm/schemas/user.schema';
import { UserTypeOrmRepository } from '../infra/repositories/user.repository';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../@core/usecases/users/create-user.use-case';

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