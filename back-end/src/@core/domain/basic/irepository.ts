

export interface PagedResponse<T> {
    total: number;
    data: T[];
}

export interface IRepositoryGeneric<T> {

    GetAll(): Promise<T[]>;

    GetById(id: string): Promise<T>;

    create(entity: T): Promise<T>;

    update(entity: T): Promise<T>;

    delete(id: string): Promise<void>;

    findPaginated(
        query: PaginationDto,
    ): Promise<PagedResponse<T>>;
}

export type FilterDTO = {
  searchColumn: string;
  searchValue: string;
};

export type OrderDTO = {
  orderBy: string;
  orderDirection: string;
};

export interface PagedResponse<T> {
  total: number;
  data: T[];
}

export class PaginationDto {
  page: number = 1;
  limit: number = 10;

  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';

  filters?: FilterDTO[];
}