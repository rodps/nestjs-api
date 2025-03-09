export class Pagination {
  page: number;
  limit: number;

  constructor(data: { page: number; limit: number }) {
    if (data.page < 1) {
      throw new Error('page must be greater than 0');
    }
    if (data.limit < 1) {
      throw new Error('limit must be greater than 0');
    }
    Object.assign(this, data);
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
