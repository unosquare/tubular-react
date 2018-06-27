import * as React from 'react';
import IBaseDataSourceState from './IBaseDataSourceState';

interface IDataSourceContext {
    dataSource?: IBaseDataSourceState;
    activeColumn: null;
    actions?: any;
}
export const DataSourceContext = React.createContext<IDataSourceContext>({
    actions: null,
    activeColumn: null,
    dataSource: null
});
