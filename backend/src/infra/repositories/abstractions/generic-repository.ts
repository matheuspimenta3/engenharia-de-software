/* eslint-disable prettier/prettier */
import { HttpException } from '@nestjs/common';
import { Entity } from '../../../@core/domain/basic/entity';
import { PagedResponse } from '../../../@core/domain/basic/irepository';//'src/@core/domain/basic/irepository';
import { PaginationDto } from '../../../app/dtos/pagination'; //'src/app/DTO\'s/pagination';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

// Agora aceitamos a Entidade de Domínio (TDomain) e o Schema do Banco (TSchema)
export abstract class GenericRepository<TDomain extends Entity<any>, TSchema extends { id: string }> {

    constructor(
        // O Repository do TypeORM lida exclusivamente com o TSchema
        protected readonly repository: Repository<TSchema>,
    ) { }

    // Métodos obrigatórios que os repositórios concretos implementarão para converter os dados
    protected abstract toDomain(schema: TSchema): TDomain;
    protected abstract toPersistence(domain: TDomain): DeepPartial<TSchema>;

    async GetAll(): Promise<TDomain[]> {
        const schemas = await this.repository.find();
        return schemas.map(schema => this.toDomain(schema));
    }

    async GetById(id: string): Promise<TDomain> {
        const schema = await this.repository.findOne({
            where: { id: id } as unknown as FindOptionsWhere<TSchema>,
        });
        if (schema) return this.toDomain(schema);
        throw new HttpException('Object not found', 404);
    }

    async create(entity: TDomain): Promise<TDomain> {
        // Converte a entidade de domínio para o formato que o TypeORM entende
        const persistenceModel = this.toPersistence(entity);
        const createdSchema = this.repository.create(persistenceModel);
        const savedSchema = await this.repository.save(createdSchema);
        
        // Retorna sempre a Entidade de Domínio para manter as camadas superiores puras
        return this.toDomain(savedSchema);
    }

    async update(entity: TDomain): Promise<TDomain> {
        const persistenceModel = this.toPersistence(entity);
        // O preload precisa das propriedades puras do banco de dados
        const data = await this.repository.preload(persistenceModel);

        if (!data) throw new HttpException('Object not found', 404);
        
        const updatedSchema = await this.repository.save(data);
        return this.toDomain(updatedSchema);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findPaginated(
        query: PaginationDto,
    ): Promise<PagedResponse<TDomain>> {
        const qb = this.repository.createQueryBuilder('entity');

        const total = await qb.getCount();

        const schemas = await qb
            .skip((query.page - 1) * query.limit)
            .take(query.limit)
            .getMany();

        return {
            total,
            data: schemas.map(schema => this.toDomain(schema)),
        };
    }
}