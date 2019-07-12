import * as React from 'react';
import IBaseDataSourceState from './IBaseDataSourceState';

interface IDataSourceContext {
    actions?: any;
    state?: IBaseDataSourceState;
}
export const DataSourceContext = React.createContext<IDataSourceContext>({
    actions: null,
    state: null,
});
