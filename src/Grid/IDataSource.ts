export default interface IDataSource {
  connect(rowsPerPage?: number, page?: number, searchText?: string): any;

  refresh(rowsPerPage?: number, page?: number, searchText?: string): void;

  getAllRecords(rowsPerPage: number, page: number, searchText: string): Promise<object>;
}
