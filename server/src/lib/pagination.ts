class Pagination {
  private _page: number;

  private _perPage: number;

  constructor(page?: number, perPage?: number) {
    this._page = page ?? 1;
    this._perPage = perPage ?? 6;
  }

  public set page(page: number) {
    if (page < 1) {
      throw new Error('Invalid page number');
    }

    this._page = page;
  }

  public get page(): number {
    return this._page;
  }

  public set perPage(perPage: number) {
    if (perPage < 1) {
      throw new Error('Invalid page size');
    }

    this._perPage = perPage;
  }

  public get perPage(): number {
    return this._perPage;
  }

  public get offset(): number {
    return this._perPage * (this._page - 1);
  }

  public calculateTotalPages(totalItems: number): number {
    return totalItems > 1 ? Math.ceil(totalItems / this._perPage) : 1;
  }
}

export default Pagination;
