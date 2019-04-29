import * as React from 'react';
import { DataSourceContext } from '../DataSource/DataSourceContext';
import { ToolbarOptions } from '../Models';

let counter = 0;

export interface IDataGridContext {
    gridName?: string;
    toolbarOptions?: ToolbarOptions;
}

export const DataGridContext = React.createContext<IDataGridContext>(null);

export const DataGridProvider = ({ gridName, toolbarOptions, children }: any) => {
    const [ isLoaded, setLoaded ] = React.useState(false);
    const { actions } = React.useContext(DataSourceContext);
    const state: IDataGridContext = {
        gridName: gridName || `Grid${counter++}`,
        toolbarOptions: toolbarOptions || new ToolbarOptions(),
    };

    if (!isLoaded) {
        actions.updateItemPerPage(state.toolbarOptions.itemsPerPage);
        setLoaded(true);
    }

    return (
        <DataGridContext.Provider value={state}>
            {children}
        </DataGridContext.Provider>
    );
};
