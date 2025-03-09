import { Pagination } from './pagination';

export class Page<T> {
  data: T[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;

  constructor(pagination: Pagination, data: T[], total: number) {
    this.data = data;
    this.total = total;
    this.limit = pagination.limit;
    this.page = pagination.page;
    this.totalPages = Math.ceil(total / pagination.limit);
  }
}
