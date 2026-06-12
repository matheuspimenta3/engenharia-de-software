/* eslint-disable prettier/prettier */
import { HttpException } from '@nestjs/common';
import { Entity } from '../../../@core/domain/basic/entity';
import { PagedResponse, PaginationDto } from '../../../@core/domain/basic/irepository';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export abstract class GenericRepository<TDomain extends Entity<any>, TSchema extends { id: string }> {

    constructor(
        protected readonly repository: Repository<TSchema>,
    ) { }

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
        const persistenceModel = this.toPersistence(entity);
        const createdSchema = this.repository.create(persistenceModel);
        const savedSchema = await this.repository.save(createdSchema);

        return this.toDomain(savedSchema);
    }

    async update(entity: TDomain): Promise<TDomain> {
        const persistenceModel = this.toPersistence(entity);
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

        if (query.orderBy) {
            qb.orderBy(
                `entity.${query.orderBy}`,
                query.orderDirection ?? 'ASC',
            );
        }

        const total = await qb.getCount();

        const schemas = await qb
            .skip((query.page - 1) * query.limit)
            .take(query.limit)
            .getMany();

        return {
            total,
            data: schemas.map(schema =>
                this.toDomain(schema),
            ),
        };
    }
}