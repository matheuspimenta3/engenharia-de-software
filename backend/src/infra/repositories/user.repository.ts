/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericRepository } from './abstracao/generic-repository';
import User from 'src/@core/domain/users/entitie/user.entitiy'; // Mantendo o caminho/nome atual do seu projeto
import { UserSchema } from '../database/typeorm/schemas/user.schema';
import { IUserRepository } from 'src/@core/domain/users/interfaces/iuserrepository';

@Injectable()
export class UserTypeOrmRepository
    extends GenericRepository<User, UserSchema>
    implements IUserRepository {
    constructor(
        @InjectRepository(UserSchema)
        protected readonly typeOrmRepository: Repository<UserSchema>,
    ) {
        // Passa o repositório nativo do TypeORM para a classe abstrata pai
        super(typeOrmRepository);
    }

    /**
     * Passo 1 & Lembrete: Inicializa a Entidade do Domínio 
     * transformando as colunas do banco (Schema) em regras de negócio.
     */
    protected toDomain(schema: UserSchema): User {
        return User.newEntity(
            {
                name: schema.name,
                email: schema.email,
                password: schema.password,
                role: schema.role,
                active: schema.active,
            },
            schema.id, // Passa o ID vindo do banco para a entidade manter a identidade
        );
    }

    /**
     * Transforma a Entidade do Domínio pura de volta para o formato 
     * que o banco de dados precisa para salvar ou atualizar.
     */
    protected toPersistence(domain: User): DeepPartial<UserSchema> {
        return {
            id: domain.id, // O BaseRepository ou a classe Entity expõe o ID string
            name: domain.name,
            email: domain.email,
            password: domain.password,
            role: domain.role,
            active: domain.active,
        };
    }

    /**
     * Método exclusivo da interface IUserRepository do Domínio.
     * Verifica se o e-mail já existe na base de dados.
     */
    async findByEmail(email: string): Promise<boolean> {
        const user = await this.typeOrmRepository.findOne({
            where: { email },
        });

        // Retorna true se encontrou o usuário, ou false caso contrário
        return !!user;
    }
}