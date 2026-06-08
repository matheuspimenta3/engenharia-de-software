import { HttpException } from '@nestjs/common';
import { Entity } from 'src/@core/domain/basic/entity';
import { PagedResponse } from 'src/@core/domain/basic/irepository';
import { PaginationDto } from 'src/app/DTO\'s/pagination';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseRepository<T extends Entity<any>> {

    constructor(
        protected readonly repository: Repository<T>,
    ) { }

    async GetAll(): Promise<T[]> {
        return this.repository.find();
    }

    async GetById(id: string): Promise<T> {
        const data = await this.repository.findOne({
            where: { id: id } as FindOptionsWhere<T>,
        });
        if (data) return data;
        throw new HttpException('Object not found', 404);
    }

    async create(entity: T): Promise<T> {
        const created = this.repository.create(entity);

        return this.repository.save(created);
    }

    async update(entity: T): Promise<T> {
    const data = await this.repository.preload(entity);

    if (!data)  throw new HttpException('Object not found', 404);
    
    const updated = await this.repository.save(data.toUpdate() as DeepPartial<T>,);
    return updated;
}

    async delete(id: string) {
        await this.repository.delete(id);
    }

    async findPaginated(
        query: PaginationDto,
    ): Promise<PagedResponse<T>> {
        const qb = this.repository.createQueryBuilder('entity');

        const total = await qb.getCount();

        const data = await qb
            .skip((query.page - 1) * query.limit)
            .take(query.limit)
            .getMany();

        return {
            total,
            data,
        };
    }
}