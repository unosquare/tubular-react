import * as React from 'react';
import IBaseDataSourceState from './IBaseDataSourceState';

interface IDataSourceContext {
    state?: IBaseDataSourceState;
    actions?: any;
}
export const DataSourceContext = React.createContext<IDataSourceContext>({
    actions: null,
    state: null
});
