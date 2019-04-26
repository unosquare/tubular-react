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
    const { actions } = React.useContext(DataSourceContext);
    const state: IDataGridContext = {
        gridName: gridName || `Grid${counter++}`,
        toolbarOptions: toolbarOptions || new ToolbarOptions(),
    };

    actions.updateItemPerPage(state.toolbarOptions.itemsPerPage);

    return (
        <DataGridContext.Provider value={state}>
            {children}
        </DataGridContext.Provider>
    );
};
