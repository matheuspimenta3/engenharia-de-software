/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository as TypeOrmInjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericRepository } from '../abstractions/generic-repository';
import User from '../../../@core/domain/users/entitie/user.entitiy';
import { UserSchema } from './user.schema';
import { IUserRepository } from '../../../@core/domain/users/interfaces/iuserrepository';
import { Not } from 'typeorm';

@Injectable()
export class UserTypeOrmRepository
    extends GenericRepository<User, UserSchema>
    implements IUserRepository {
    
    // 2. ADICIONE O DECORADOR BEM AQUI ANTES DO PARÂMETRO:
    constructor(
        @TypeOrmInjectRepository(UserSchema)
        repository: Repository<UserSchema>
    ) {
        super(repository);
    }


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


    async findByEmail(email: string, id_user?: string): Promise<boolean> {
        const whereCondition: any = { email: email };

        // Se o id_user foi passado (cenário de Update), ignora o próprio ID na busca
        if (id_user) {
            whereCondition.id = Not(id_user);
        }

        const user = await this.repository.findOne({
            where: whereCondition,
        });

        // Retorna true se encontrou o usuário, ou false caso contrário
        return !!user;
    }
}

// Re-export the TypeORM InjectRepository decorator under the local name if needed elsewhere
export const InjectRepository = TypeOrmInjectRepository;
