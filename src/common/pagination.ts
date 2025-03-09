export class Pagination {
  constructor(
    readonly page: number,
    readonly limit: number,
  ) {}

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
