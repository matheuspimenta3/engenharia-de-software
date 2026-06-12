/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericRepository } from '../abstractions/generic-repository';
import User from '../../../@core/domain/users/entitie/user.entitiy'; // Mantendo o caminho/nome atual do seu projeto
import { UserSchema } from './user.schema';
import { IUserRepository } from '../../../@core/domain/users/interfaces/iuserrepository';

@Injectable()
export class UserTypeOrmRepository
    extends GenericRepository<User, UserSchema>
    implements IUserRepository {


    protected toDomain(schema: UserSchema): User {
        return User.newEntity(
            {
                name: schema.name,
                email: schema.email,
                password: schema.password,
                role: schema.role,
                active: schema.active,
                createdAt: schema.createdAt,
                updatedAt: schema.updatedAt,
            },
            schema.id,
        );
    }


    protected toPersistence(domain: User): DeepPartial<UserSchema> {
        return {
            id: domain.id,
            name: domain.name,
            email: domain.email,
            password: domain.password,
            role: domain.role,
            active: domain.active,
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt,
        };
    }


    async findByEmail(email: string): Promise<boolean> {
        const user = await this.repository.findOne({
            where: { email },
        });

        // Retorna true se encontrou o usuário, ou false caso contrário
        return !!user;
    }
}