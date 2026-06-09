import { FilterDTO } from "../../../src/@core/domain/basic/irepository";

export class PaginationDto {
  page: number = 1;
  limit: number = 10;

  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';

  filters?: FilterDTO[];
}