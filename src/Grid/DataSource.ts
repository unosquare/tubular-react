interface DataSource {
  connect(rowsPerPage?: number, page?: number, searchText?: number): any;

  refresh(rowsPerPage?: number, page?: number, searchText?: number): void;

  getAllRecords(rowsPerPage: number, page: number, searchText: number): Promise<object>;

  handleError(error: any): void;
}