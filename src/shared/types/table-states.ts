export interface ITableStateForFilter {
  page: string;
  searchBar: string;
  sorting: string;
  formFilters: {
    createdAt: string;
    title: string;
  };
}
