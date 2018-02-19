import { ColumnModel } from '..';
import { CompareOperators } from '../Column';

export default class Utils {

  public normalizeColumns = (columns: ColumnModel[]) =>
    columns.map((column) => {
      const obj = Object.assign({}, ColumnModel.defaultColumnValues, column);

      if (column.Filtering) {
        obj.Filter = {
          Argument: [],
          HasFilter: false,
          Name: obj.Name,
          Operator: CompareOperators.NONE,
          OptionsUrl: null,
          Text: null
        };
      }
      delete obj.Filtering;

      return obj;
    })
}
